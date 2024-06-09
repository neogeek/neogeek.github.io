---
title: CandyCoded First Public Beta!
subtitle: I'm super excited to announce the first public beta of my Unity library CandyCoded!
date: 03/25/2018
---

# CandyCoded First Public Beta!

I'm super excited to announce the first public beta of my Unity library [CandyCoded](https://github.com/neogeek/CandyCoded)!

> <https://assetstore.unity.com/packages/tools/animation/candycoded-115239>

I've built a rather large collection of code snippets and reusable components after I first started learning Unity a little over a year ago. While a lot of those have made their way into my [open source snippets repo](https://github.com/neogeek/Unity-Snippets), the remainder have found a more permanent home in my first open source Unity package: CandyCoded.

My goal with CandyCoded is to have a solid foundation for every Unity project I work on and a resource for myself and others to learn from.

Since there are over 40 features included in this initial release I will highlight some of my favorite:

## Vector3AnimationCurve

AnimationCurves are awesome for one-off custom animations. But they lack the power of an Animation Controller in where it is easy to modify transform properties.

Vector3AnimationCurve is a custom struct that includes three separate AnimationCurves for x, y, and z. It also exposes the same method for returning a value along the curve based on time elapsed, Evaluate. This custom version of Evaluate returns a Vector3 that can be used to modify position, rotation or scale of an object.

<div class="images">
  <figure>
    <img src="/images/candycoded-first-public-beta/animation-curve.png" alt="Screenshot of Vector3AnimationCurve in the Unity inspector." />
    <figcaption>Screenshot of Vector3AnimationCurve in the Unity inspector.</figcaption>
  </figure>
</div>

## Animate

Animate isn't a full-blown animation library, but with the power of AnimationCurves, it sorta feels like it.

Animate allows for quick one-off animations like moving a game object to a new position or changing its rotation.

```csharp
CandyCoded.Animate.MoveTo(target, new Vector3(10, 10, 10), 1);
```

But it also allows for further customization by taking a custom AnimationCurve as a parameter.

```csharp
public CandyCoded.Vector3AnimationCurve positionAnimationCurve;
public CandyCoded.Vector3AnimationCurve rotationAnimationCurve;

private void Start() {
    CandyCoded.Animate.Position(gameObject, positionAnimationCurve);
    CandyCoded.Animate.Rotate(gameObject, rotationAnimationCurve);
}
```

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/259859648?h=856387bfb8" width="640" height="338" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

## Reflect

Lasers, lasers, LASERS!

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/259797066?h=70bab9c1a9" width="640" height="340" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

This method was originally built while I was working on a golf game where I wanted to show the player exactly where the ball would end up based on angle and power. I ended up shelving that game concept but realized that with a little bit of work I could turn this code into an easy to use resource for building reflecting line renderers in just one function call.

## ScriptableObjects

These custom ScriptableObjects are easy to use templates for storing simple data like current score or a list of active GameObjects.

At first, I was completely onboard with the Singleton pattern in Unity. That was until I heard about ScriptableObjects, and now my workflow in Unity will never be the same.

ScriptableObjects are perfect for maintaining and sharing data, not only between multiple objects but multiple scenes. This prevents "dirty" scenes, where objects need to persist from one scene to another with references to data used throughout the app. ScriptableObjects can be referenced anywhere and don't require an object to live in the scene to do so.

<div class="images">
  <figure>
    <img src="/images/candycoded-first-public-beta/gameobject-list-reference.png" alt="Screenshot of GameObjectListReference ScriptableObject in the Unity inspector." />
    <figcaption>Screenshot of GameObjectListReference ScriptableObject in the Unity inspector.</figcaption>
  </figure>
</div>

And if you haven't already, you should check out the video that convinced me that ScriptableObjects are the way to go.

<div class="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/raQ3iHhE_Kk"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

---

If you do check out the beta please let me know if you find any issues with the documentation or run into any bugs in the library itself. I've also setup a Discord channel if you have any further questions or just want to chat!

Thanks!

- GitHub - <https://github.com/neogeek/CandyCoded>
- GitHub - <https://github.com/neogeek/Unity-Snippets>
- Discord - <https://discord.gg/nNtFsfd>
