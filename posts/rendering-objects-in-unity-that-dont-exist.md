---
title: Rendering Objects in Unity That Don't Exist
subtitle: Learn how to renders hundreds or thousands of objects in Unity without using GameObjects.
date: 06/27/2024
---

# Rendering Objects in Unity That Don't Exist

You pass an object on the street. It's eerie in a way that you can't place. You don't look at it directly and keep walking. Abruptly, the object changes direction and passes through you at an accelerated rate, causing you to nearly lose your footing. What just happened? Was it a ghost? Or was it a mesh rendered in 3d space using `Matrix4x4` and `Graphics.DrawMeshInstanced`?

I've been researching different ways to render objects for my upcoming, untitled rhythm game. Should I use GameObjects where each note exists in the scene with mesh renderers and box colliders, or should I use <abbr title="Entity component system">ECS</abbr> and render the notes using positional and mesh data in their most simple form? Or do I choose another less talked about way?

There was another way I had considered for a brief moment, and as I assumed it was only for rendering static meshes, I quickly disregarded it. But it turns out I was wrong, and it can be used to render meshes that are both static and in motion!

## Graphics.DrawMesh

In the following example, we have references for both a mesh and material asset that can be set up in the inspector within Unity. Once we have those, we can create a `Matrix4x4` with a position of `0,0,0` and a scale of `1`. Using this information, we can now render all of that data using `Graphics.DrawMesh`.

```csharp
using UnityEngine;

public class RenderMesh : MonoBehaviour
{

    [SerializeField]
    private Mesh _mesh;

    [SerializeField]
    private Material _material;

    private int _layer;

    private void Awake()
    {
        _layer = LayerMask.NameToLayer("Default");
    }

    private void Update()
    {
        var matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, Vector3.one);

        Graphics.DrawMesh(_mesh, matrix, _material, _layer);
    }

}
```

![](/images/rendering-objects-in-unity-that-dont-exist/cube-graphics-draw-mesh.jpg)

But what if we wanted to render multiple versions of this cube at different positions?

## Graphics.DrawMeshInstanced

We can use the same setup as before, but this time, we will create a list of 10,000 `Matrix4x4` objects with different positions. And on `Update`, we will update the rotation of each one to demonstrate how updating these entities can work.

Even with 10,000 objects, this demo performs at above 150 FPS.

```csharp
using System.Collections.Generic;
using UnityEngine;

public class RenderMesh : MonoBehaviour
{

    [SerializeField]
    private Mesh _mesh;

    [SerializeField]
    private Material _material;

    [SerializeField]
    private float _rotationSpeed = 100;

    private float _rotation;

    private Vector3 _scale;

    private int _layer;

    private readonly List<Matrix4x4> _matrices = new();

    private void Awake()
    {
        _material.enableInstancing = true;

        _layer = LayerMask.NameToLayer("Default");
    }

    private void Start()
    {
        var rotation = Quaternion.Euler(_rotation, _rotation, _rotation);

        _scale = Vector3.one / 2;

        const int size = 100;

        for (var x = -size; x < size; x += 1)
        {
            for (var y = -size; y < size; y += 1)
            {
                _matrices.Add(Matrix4x4.TRS(new Vector3(x + 0.5f, y, 0), rotation, _scale));
            }
        }
    }

    private void Update()
    {
        _rotation += _rotationSpeed * Time.deltaTime;

        var rotation = Quaternion.Euler(_rotation, _rotation, _rotation);

        for (var i = 0; i < _matrices.Count; i++)
        {
            _matrices[i] = Matrix4x4.TRS(_matrices[i].GetColumn(3), rotation, _scale);
        }

        Graphics.DrawMeshInstanced(_mesh, _layer, _material, _matrices);
    }

}
```

In this example, we do the same thing for the setup, but you'll notice a critical change in the material. The material has a property enabled named `enableInstancing` (this can also be directly set on the material asset). This makes it possible to render multiple meshes with the same material. Without this, mesh instancing will fail to work.

Now, instead of using `Graphics.DrawMesh`, we call `Graphics.DrawMeshInstanced`, and it will render all of these objects with their defined position and rotation.

![](/images/rendering-objects-in-unity-that-dont-exist/cube-graphics-draw-mesh-instanced.jpg)

This is a screenshot with the camera pulled out to show all 10,000 objects.

![](/images/rendering-objects-in-unity-that-dont-exist/cube-graphics-draw-mesh-instanced-zoomed-out.jpg)

## Final Thoughts

This way of working might make sense for your project, but it might not. It's another way of rendering objects where you might not need the same support you get from traditional GameObjects. My untitled rhythm game doesn't require anything to exist in the scene for collision or interactive purposes, so this flow makes a lot of sense. Also, the framerate boot I'm getting has been incredible so far, which is good because I want to make sure I'm dedicating as much power as possible to detecting when a person presses a note and not for rendering notes on the screen.

If you want to give this code a try without needing to set up your own project, the GitHub repo [**https://github.com/neogeek/Rendering-Objects-in-Unity-That-Dont-Exist**](https://github.com/neogeek/Rendering-Objects-in-Unity-That-Dont-Exist) contains all of this code and a demo scene.
