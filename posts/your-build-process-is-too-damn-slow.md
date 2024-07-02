---
title: Your Build Process Is Too Damn Slow
subtitle: Load AssetBundles from a local server to speed up mobile development testing.
date: 08/16/2018
---

# Your Build Process Is Too Damn Slow

<div class="banner">
<p>This blog post has been updated to work with the latest version Unity 2022.3</p>
</div>

**TL:DR** — Load AssetBundles from a local server to speed up mobile development testing. See the repo linked below.

> GitHub Repo: <https://github.com/neogeek/your-build-process-is-too-damn-slow>

We have all been there. Hit build and run. Wait. Wait some more. Pick up your Nintendo Switch and play a bit of your favorite roguelike. All while periodically glancing up at your computer to see if it is finished. After it is complete, you pick up your mobile device and start testing, and right away, something is broken. Time to rinse and repeat.

<div class="images">
  <figure>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXV2NjBhbmp0a2VjczF6YmVibzV2NjZkbHd3NWt0Z2k5dmdma2x1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5XPb0FvIqylqg/giphy.gif" alt="Skeletor throwing his arms in the air and yelling." />
    <figcaption>Skeletor testing his app for the first time</figcaption>
  </figure>
</div>

This process is not conducive to a productive work environment.

Luckily, there is a better way.

## 🎉 Introducing AssetBundles

You may have heard of asset bundles before now and thought they were a useful idea, but you don't have a use for them. Until now, that is.

AssetBundles can be used to speed up your build process by allowing you to build the majority of your app once and then continually bundle and load a single scene from a remote local server for quick iteration. This is most useful when building mobile apps, as the roundtrip from Unity to Xcode/Android Studio to a device is slow.

## 📦 Creating AssetBundle Files

First, pick the scenes or assets that will be loaded from an AssetBundle hosted on a local server. Once you have determined what scenes or assets you will be using, you will tag it and build it using a custom script.

> ⚠️ **Note:** You can not mix scenes and assets in the same tag as they are loaded differently.

To tag your scene or asset, select it from the Assets panel, then navigate to the bottom of the inspector to find the Asset Labels sections. Select the drop-down on the left and set a unique name for the bundle.

<div class="images">
  <figure>
    <img src="/images/your-build-process-is-too-damn-slow/asset-labels.gif" alt="Screen capture of an asset label being selected." />
  </figure>
</div>

Next, add the following script to your project. This file will add an item to the Asset panel's drop-down/right-click menu for creating AssetBundles. Once you select this, a folder will be created and populated with the generated AssetBundles.

> ⚠️ **Note:** Take note of the use of the `activeBuildTarget` reference. This is because Asset Bundles must be built and loaded using the same build target. You can't load Asset Bundles built for macOS on iOS, for example.

```csharp
// https://github.com/neogeek/your-build-process-is-too-damn-slow/blob/main/Assets/Scripts/CreateAssetBundles.cs

#if UNITY_EDITOR

using System.IO;
using UnityEditor;
using UnityEngine;

public static class CreateAssetBundles
{

    [MenuItem("Assets/Build AssetBundles")]
    private static void BuildAllAssetBundles()
    {
        var assetBundleDirectory =
            Path.Combine("Assets/AssetBundles", EditorUserBuildSettings.activeBuildTarget.ToString());

        if (!Directory.Exists(assetBundleDirectory))
        {
            Directory.CreateDirectory(assetBundleDirectory);
        }

        BuildPipeline.BuildAssetBundles(
            assetBundleDirectory,
            BuildAssetBundleOptions.None,
            EditorUserBuildSettings.activeBuildTarget);
    }

}

#endif
```

> For more information about the bundling process, refer to this section of the Unity documentation <https://docs.unity3d.com/Manual/AssetBundles-Workflow.html>

## 🌎 Serving AssetBundles Locally

Open Terminal and navigate to your project directory. Paste the following command in and press enter. This command will start a simple Python server in the folder where the AssetBundle files are.

```bash
$ (cd Assets/AssetBundles && python3 -m http.server 8000)
```

Once the server is running, navigate to <http://localhost:8000/> to make sure it's working. You should see a list of the same files that you can see from Unity.

## 🔧 Setup AssetBundle Utilities

Let's create a script to manage downloading and loading asset bundles and the contents within them.

### DownloadAssetBundle

First, let's create a method to download asset bundles. I've added comments in the method explaining each part.

```csharp
using System;
using System.Collections;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public static class AssetBundleUtilities
{

    public static async Task DownloadAssetBundle(string assetBundleDirectory, string assetBundleUrl,
        Action<float> progressCallback, Action<Exception> errorCallback)
    {
        // Create the asset bundle directory if it doesn't exist.
        if (!Directory.Exists(assetBundleDirectory))
        {
            Directory.CreateDirectory(assetBundleDirectory);
        }

        // Combine your asset bundle directory with the file name of the asset bundle you are downloading.
        var bundlePath = Path.Combine(assetBundleDirectory, Path.GetFileName(assetBundleUrl));

        // If the asset bundle already exists, return. This prevents re-downloading the same
        // asset bundle more than once.
        if (File.Exists(bundlePath))
        {
            return;
        }

        // Create a request to download the asset bundle.
        using var request = new UnityWebRequest(assetBundleUrl, UnityWebRequest.kHttpVerbGET);

        // Attach a download handler to the request. This will automatically save the file if the
        // download is successful.
        request.downloadHandler = new DownloadHandlerFile(bundlePath) { removeFileOnAbort = true };

        // Start the request for the asset bundle.
        var operation = request.SendWebRequest();

        // Report the progress using the progressCallback method until the operation is completed.
        while (!operation.isDone)
        {
            progressCallback(operation.progress);

            await Task.Yield();
        }

        if (request.result == UnityWebRequest.Result.Success)
        {
            // If successful, the progressCallback method is called with the final progress.
            progressCallback(operation.progress);
        }
        else
        {
            // If not successful, the errorCallback method is called with a WebException.
            errorCallback(new WebException($"Failed to download asset bundle: {request.error}"));
        }
    }

}
```

Call this method from an async method like `Start` or via `Task.Run`.

```csharp
private async void Start()
{
    var assetBundleDirectory = Path.Combine(Application.persistentDataPath, "AssetBundles");

    var bundleUrl = "http://localhost:8000/samplescene";

    await AssetBundleUtilities.DownloadAssetBundle(assetBundleDirectory, bundleUrl,
        progress => Debug.Log($"Downloading: {progress * 100}%"),
        error => Debug.LogError($"Error: {error.Message}"));
}
```

You can also load multiple asset bundles using `Task.WhenAll`.

```csharp
private async void Start()
{
    var assetBundleDirectory = Path.Combine(Application.persistentDataPath, "AssetBundles");

    await Task.WhenAll(new List<Task>()
    {
        AssetBundleUtilities.DownloadAssetBundle(assetBundleDirectory,
            "http://localhost:8000/samplescene",
            progress => Debug.Log($"Downloading: {progress * 100}%"),
            error => Debug.LogError($"Error: {error.Message}")),
        AssetBundleUtilities.DownloadAssetBundle(assetBundleDirectory,
            "http://localhost:8000/prefabs",
            progress => Debug.Log($"Downloading: {progress * 100}%"),
            error => Debug.LogError($"Error: {error.Message}"))
    });
}
```

### LoadAssetBundle

Next, we will create a method (in the same class) for loading asset bundles already stored on the device. As before, I've added comments in the method explaining each part.

```csharp
public static IEnumerator LoadAssetBundle(string assetBundleDirectory, string bundleName,
    Action<float> progressCallback, Action<AssetBundle> loadedCallback, Action<Exception> errorCallback)
{
    // Combine the asset bundle directory with the name of the asset bundle you are loading.
    var bundlePath = Path.Combine(assetBundleDirectory, bundleName);

    // If the asset bundle doesn't exist, throw an error.
    if (!File.Exists(bundlePath))
    {
        errorCallback(new FileNotFoundException($"Failed to load asset bundle: {bundleName}"));

        yield break;
    }

    // Create a request to load the asset bundle.
    var bundleLoadRequest = AssetBundle.LoadFromFileAsync(bundlePath);

    // Report the progress using the progressCallback method until the operation is completed.
    while (!bundleLoadRequest.isDone)
    {
        progressCallback(bundleLoadRequest.progress);

        yield return null;
    }

    var assetBundle = bundleLoadRequest.assetBundle;

    if (!assetBundle)
    {
        assetBundle.Unload(false);

        // If not successful, the errorCallback method is called with a FileNotFoundException.
        errorCallback(new FileNotFoundException($"Failed to load asset bundle: {bundleName}"));
    }
    else
    {
        // If successful, the progressCallback method is called with the final progress.
        progressCallback(bundleLoadRequest.progress);

        // Finally, call the loadedCallback method with the loaded asset bundle resource.
        loadedCallback(assetBundle);
    }
}
```

But before we use this, we need to reference it from another method. This is because you can store _either_ scenes or non-scene assets in asset bundles, and we need to load them into Unity using specific logic, but the logic to load them from a file into memory is the same.

### LoadSceneFromAssetBundle

First, let's learn how to load a scene from an asset bundle.

```csharp
public static IEnumerator LoadSceneFromAssetBundle(string assetBundleDir, string bundleName, string scenePath,
    LoadSceneMode loadSceneMode, Action<float> progressCallback, Action<Exception> errorCallback)
{
    // Create a reference for the asset bundle.
    AssetBundle assetBundle = null;

    // Load the asset bundle and use the loadedCallback to store the reference in the local variable above.
    yield return LoadAssetBundle(assetBundleDir, bundleName, progressCallback,
        bundle => assetBundle = bundle, errorCallback);

    // If not successful, the errorCallback method is called with a FileNotFoundException.
    if (assetBundle == null)
    {
        errorCallback(new FileNotFoundException($"Failed to load asset bundle: {bundleName}"));

        yield break;
    }

    // If the asset bundle does not contain scenes, the errorCallback method is called with an
    // InvalidOperationException.
    if (!assetBundle.isStreamedSceneAssetBundle)
    {
        assetBundle.Unload(false);

        errorCallback(new InvalidOperationException("Can only load a scene using this method."));

        yield break;
    }

    // If the requested scene is not found, the errorCallback method is called with a FileNotFoundException.
    if (Array.Find(assetBundle.GetAllScenePaths(), path => path.Equals(scenePath)) == null)
    {
        assetBundle.Unload(false);

        errorCallback(new FileNotFoundException($"Scene {scenePath} not found in asset bundle {bundleName}."));

        yield break;
    }

    // If successful, the scene is loaded using the LoadSceneMode (Single or Additive)
    var sceneLoadRequest = SceneManager.LoadSceneAsync(scenePath, loadSceneMode);

    yield return sceneLoadRequest;

    assetBundle.Unload(false);
}
```

To use this method, call it using `StartCoroutine`.

```csharp
public void HandleLoadSceneButtonClick()
{
    var assetBundleDirectory = Path.Combine(Application.persistentDataPath, "AssetBundles");

    var bundleUrl = "http://localhost:8000/samplescene";

    var scenePath = "Assets/Scenes/SceneToLoadViaURL.unity";

    StartCoroutine(AssetBundleUtilities.LoadSceneFromAssetBundle(
            assetBundleDirectory,
            Path.GetFileName(bundleUrl),
            scenePath, LoadSceneMode.Additive,
            progress => Debug.Log($"Loading: {progress * 100}%"),
            error => Debug.LogError($"Error: {error.Message}")));
}
```

### LoadAssetFromAssetBundle

Next, we will learn how to load an asset from an asset bundle.

```csharp
public static IEnumerator LoadAssetFromAssetBundle<T>(string assetBundleDir, string bundleName, string assetPath,
    Action<float> progressCallback,
    Action<T> instantiateCallback, Action<Exception> errorCallback)
    where T : UnityEngine.Object
{
    // Create a reference for the asset bundle.
    AssetBundle assetBundle = null;

    // Load the asset bundle and use the loadedCallback to store the reference in the local variable above.
    yield return LoadAssetBundle(assetBundleDir, bundleName, progressCallback,
        bundle => assetBundle = bundle, errorCallback);

    // If not successful, the errorCallback method is called with a FileNotFoundException.
    if (assetBundle == null)
    {
        errorCallback(new FileNotFoundException($"Failed to load asset bundle: {bundleName}"));

        yield break;
    }

    // If the asset bundle contains scenes, the errorCallback method is called with an InvalidOperationException.
    if (assetBundle.isStreamedSceneAssetBundle)
    {
        assetBundle.Unload(false);

        errorCallback(new InvalidOperationException("Can not load a scene using this method."));

        yield break;
    }

    // Load the requested asset using the given path.
    var assetLoadRequest = assetBundle.LoadAssetAsync<T>(assetPath);

    yield return assetLoadRequest;

    if (assetLoadRequest.asset == null)
    {
        // If not successful, the errorCallback method is called with a FileNotFoundException.
        errorCallback(new FileNotFoundException($"Asset {assetPath} not found in asset bundle {bundleName}."));
    }
    else
    {
        // If successful, the instantiateCallback method is called with the asset type-casted to the requested type.
        instantiateCallback(assetLoadRequest.asset as T);
    }

    assetBundle.Unload(false);
}
```

To use this method, call it using `StartCoroutine`.

```csharp
public void HandleLoadAssetButtonClick()
{
    var assetBundleDirectory = Path.Combine(Application.persistentDataPath, "AssetBundles");

    var bundleUrl = "http://localhost:8000/prefabs";

    var assetPath = "Assets/Prefabs/Cube.prefab";

    StartCoroutine(AssetBundleUtilities.LoadAssetFromAssetBundle<GameObject>(
            assetBundleDirectory,
            Path.GetFileName(bundleUrl), assetPath,
            progress => Debug.Log($"Loading: {progress * 100}%"),
            prefab => Instantiate(prefab, Vector3.zero, Quaternion.identity),
            error => Debug.LogError($"Error: {error.Message}")));
}
```

## 🎉 Putting it all Together

Using these utility methods, you can easily get started downloading and loading Asset Bundles in Unity. How you organize your project to get these performance gains is up to you and your team. (I plan on making a follow-up post on that as well.)

If you want to give this code a try without needing to set up your own project, the GitHub repo <https://github.com/neogeek/your-build-process-is-too-damn-slow> contains all of this code and bundled assets.
