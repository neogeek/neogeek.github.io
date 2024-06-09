---
title: Your Build Process Is Too Damn Slow
subtitle: Load AssetBundles from a local server to speed up mobile development testing.
date: 08/16/2018
---

# Your Build Process Is Too Damn Slow

**TL:DR** — Load AssetBundles from a local server to speed up mobile development testing. See repo linked below.

> <https://github.com/neogeek/your-build-process-is-too-damn-slow>

We have all been there. Hit build and run. Wait. Wait some more. Pick up your Nintendo Switch and play a bit of your favorite roguelike. All while periodically glancing up at your computer to see if it finished. After it completes, you pick up your mobile device, start testing and right away something is broken. Time to rinse and repeat.

<div class="images">
  <figure>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXV2NjBhbmp0a2VjczF6YmVibzV2NjZkbHd3NWt0Z2k5dmdma2x1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5XPb0FvIqylqg/giphy.gif" alt="Skeletor throwing his arms in the air and yelling." />
    <figcaption>Skeletor testing his app for the first time</figcaption>
  </figure>
</div>

This process is not conducive to a productive work environment.

Luckily there is a better way.

## 🎉 Introducing AssetBundles

You may have heard of asset bundles before now and thought it is a useful idea, but you don't have a use for them. Until now that is.

AssetBundles can be used to speed up your build process by allowing you to build the majority of your app once and then continually bundle and load a single scene from a remote local server for quick iteration. This is most useful when building mobile apps as the roundtrip from Unity to Xcode/Android Studio to a device is slow.

## 🔨 Creating your first AssetBundle file

First things first, picking the scene that will be loaded as an AssetBundle from a local server. Once you have determined what scene you will be using, you will tag it and build it using a custom script.

To tag your scene, first select the scene file from the Assets panel, then navigate to the bottom of the inspector to find the Asset Labels sections. Select the drop-down on the left and set a unique name for the bundle.

<div class="images">
  <figure>
    <img src="/images/your-build-process-is-too-damn-slow/asset-labels.gif" alt="Screen capture of an asset label being selected." />
  </figure>
</div>

Next, add the following script to your project. This file will add an item to the Assets drop-down/right click menu for creating AssetBundles marked with asset bundle labels. Once you select this, a folder will be created and populated with the generated AssetBundles.

```csharp
#if UNITY_EDITOR

using System.IO;
using UnityEditor;

public class CreateAssetBundles
{
    [MenuItem("Assets/Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        string assetBundleDirectory = "Assets/AssetBundles";
        if (!Directory.Exists(assetBundleDirectory))
        {
            Directory.CreateDirectory(assetBundleDirectory);
        }
        BuildPipeline.BuildAssetBundles(assetBundleDirectory, BuildAssetBundleOptions.None, EditorUserBuildSettings.activeBuildTarget);
    }
}

#endif
```

> For more information about the bundle process, refer to this section of the Unity documentation <https://docs.unity3d.com/Manual/AssetBundles-Workflow.html>

## 🎭 Setting up the scenes

Next, we set up the scene that will manage the loading of the bundled scene dynamically after tapping a button on the screen.

First, add a Button component to the screen via GameObject > UI > Button. Place it somewhere out of the way of other interactions in your bundled scene and give it a proper label.

Next, create a script that will be used to control the button interaction and to load the bundle. Once created, attach to the button that you created in the previous step.

```csharp
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public class LoadSceneFromAssetBundle : MonoBehaviour
{

    [SerializeField]
    private string assetBundleUrl;

    [SerializeField]
    private string scenePath;

    private Scene sceneRef;

    public void HandleButtonClick()
    {

        StartCoroutine(LoadAssetBundle());

    }

    private IEnumerator LoadAssetBundle()
    {

        if (sceneRef.IsValid())
        {

            yield return SceneManager.UnloadSceneAsync(sceneRef);

        }

        using (UnityWebRequest uwr = UnityWebRequestAssetBundle.GetAssetBundle(assetBundleUrl))
        {

            yield return uwr.SendWebRequest();

            if (uwr.isNetworkError || uwr.isHttpError)
            {

                Debug.Log(uwr.error);

            }
            else
            {

                AssetBundle bundle = DownloadHandlerAssetBundle.GetContent(uwr);

                if (bundle.isStreamedSceneAssetBundle)
                {

                    yield return SceneManager.LoadSceneAsync(scenePath, LoadSceneMode.Additive);

                    sceneRef = SceneManager.GetSceneByPath(scenePath);

                    SceneManager.SetActiveScene(sceneRef);

                }

                bundle.Unload(false);

            }

        }

    }

}
```

Next, you need to fill in the proper information into the inspector values as seen below.

<div class="images">
  <figure>
    <img src="/images/your-build-process-is-too-damn-slow/load-scene-from-asset-bundle.png" alt="Screenshot of the Unity inspector." />
  </figure>
</div>

## 📦 Start the local server to host the AssetBundle files

Open Terminal and navigate to your project. Paste the following command in and press enter. This command will start a simple Python server in the folder where the AssetBundle files are.

```bash
$ (cd Assets/AssetBundles && python3 -m http.server 8000)
```

Once the server is running, navigate to <http://localhost:8000/> to make sure it's working. You should see a list of the same files that you can see from Unity.

Ok, let us see if this works.

<div class="images">
  <figure>
    <img src="/images/your-build-process-is-too-damn-slow/demo.gif" alt="Screen capture of a scene getting loaded from an Asset Bundle." />
  </figure>
</div>

Nice!

## 🚢 Ship It!

Now, to get this running in a mobile environment, you need to change your build target to either iOS or Android and change the Asset Bundle URL to point to the IP address of the computer you are serving from.

To get the IP address of your computer run the following from Terminal.

Hope this helps you as it has me!

## ✏️ Important Note!

Wait! Before you go, if you are building for iOS (and maybe Android), you have to do one more thing to make sure things don't crash and burn around you.

Navigate to Edit > Project Settings > Player, then open Other Settings. Towards the bottom, you will find an option labeled Strip Engine Code. Uncheck this. If you don't, you'll end up with an EXC_BAD_ACCESS error when loading an AssetBundle.

<div class="images">
  <figure>
    <img src="/images/your-build-process-is-too-damn-slow/settings.png" alt="Screenshot of the Unity settings panel." />
  </figure>
</div>

Why? I'm not entirely sure. I'm still learning!

If you want to dig into what Unity has to say about that option check out the documentation <https://docs.unity3d.com/Manual/iphone-playerSizeOptimization.html>
