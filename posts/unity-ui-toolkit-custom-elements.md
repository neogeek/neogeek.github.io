---
title: Unity UI Toolkit Custom Elements
subtitle: Learn how to create custom Unity UI Toolkit Elements to use withing your application.
date: 06/23/2024
---

# Unity UI Toolkit Custom Elements

<div class="image">
  <figure>
    <img src="/images/unity-ui-toolkit-at-runtime/header.svg" alt="Unity logo with the words Unity UI Toolkit" />
    <figcaption><a href="https://unity.com/features/ui-toolkit">https://unity.com/features/ui-toolkit</a></figcaption>
  </figure>
</div>

> GitHub Repo: <https://github.com/neogeek/Unity-UI-Toolkit-Custom-Elements>

If you have been following my previous posts, you might have read where I talked about [Unity UI Toolkit at Runtime](/unity-ui-toolkit-at-runtime/), which is great for using existing components to render data from an external (or internal) data source. But what if an existing component doesn't have the functionality you are looking for? This happened to me recently, and I set out to learn how to take these existing components and build something new. And luckily, it turned out to be pretty simple!

## Extending VisualElement

All existing components are based on the base class `VisualElement`. Because of this, you can extend the class just like any other class in C#, like this:

```csharp
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomButton : VisualElement
    {

    }

}
```

But to make the component usable within the UI Document file format (<abbr title="Unity Extensible Markup Language">UXML</abbr>), you need to add an `UxmlFactory` class that references the custom component class.

```csharp
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomButton : VisualElement
    {

        public new class UxmlFactory : UxmlFactory<CustomButton, UxmlTraits>
        {

        }

    }

}
```

Now, you can use your component either via the UI Document editor in Unity or directly within the code.

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements">
    <ui:VisualElement style="flex-grow: 1; justify-content: center; align-items: center;">
        <Custom_UI_Elements_Namespace.CustomButton text="Custom Button" name="button" />
    </ui:VisualElement>
</ui:UXML>
```

You can also add a custom namespace reference so you don't have to directly reference it each time.

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements" xmlns:custom="Custom_UI_Elements_Namespace">
    <ui:VisualElement style="flex-grow: 1; justify-content: center; align-items: center;">
        <custom:CustomButton text="Custom Button" name="button" />
    </ui:VisualElement>
</ui:UXML>
```

## Adding Features to Existing Component

To get started with adding features to an existing component, in this case, the `ScrollView`, create a constructor within your extended class.

```csharp
using UnityEngine;
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomScrollView : ScrollView
    {

        public CustomScrollView()
        {
            Debug.Log("Constructor called");
        }

        public new class UxmlFactory : UxmlFactory<CustomScrollView, UxmlTraits>
        {

        }

    }

}
```

From here, we can start adding functionality. Let's start by adding a test mouse-down event that shows the current mouse position at the time the component was clicked.

```csharp
using UnityEngine;
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomScrollView : ScrollView
    {

        public CustomScrollView()
        {
            RegisterCallback<MouseDownEvent>(evt => Debug.Log(evt.mousePosition));
        }

        public new class UxmlFactory : UxmlFactory<CustomScrollView, UxmlTraits>
        {

        }

    }

}
```

For this component, I'm going to add dragging functionality so that the user doesn't need to use the scrollbars to move the content within the scrollable area.

To accomplish this, I did a few things within the class:

1. Added a private boolean flag to store if the mouse button is down.
1. Added event handlers for `MouseDownEvent`, `MouseMoveEvent`, and `MouseUpEvent`.
1. Set the boolean flag to `true` on `MouseDownEvent`.
1. Use the `mouseDelta` to set the `ScrollView` property `scrollOffset` on `MouseMoveEvent`
1. Set the boolean flag to `false` on `MouseUpEvent`

```csharp
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomScrollView : ScrollView
    {

        private bool _isMouseDown;

        public CustomScrollView()
        {
            RegisterCallback<MouseDownEvent>(OnMouseDown);
            RegisterCallback<MouseMoveEvent>(OnMouseMove);
            RegisterCallback<MouseUpEvent>(OnMouseUp);
        }

        public new class UxmlFactory : UxmlFactory<CustomScrollView, UxmlTraits>
        {

        }

        protected virtual void OnMouseDown(MouseDownEvent evt)
        {
            _isMouseDown = true;
        }

        protected virtual void OnMouseMove(MouseMoveEvent evt)
        {
            if (!_isMouseDown)
            {
                return;
            }

            scrollOffset -= evt.mouseDelta;
        }

        protected virtual void OnMouseUp(MouseUpEvent evt)
        {
            _isMouseDown = false;
        }

    }

}
```

## Adding Properties to Existing Component

Next, let's add properties to the component that can be changed from within the UI Document editor in Unity or directly within the code. To do that, we need to add a new class within our custom component called `UxmlTraits` that extends `VisualElement.UxmlTraits`, and include the properties we want to allow the user to customize. As our custom component allows users to drag the contents, we might want to allow toggling the visibility of the scrollbars.

A couple of things to note about this setup:

1. The custom component needs to have a public property with getters and setters for serialization.
1. Make sure to use the correct `TypedUxmlAttributeDescription`, in this case, it's a boolean, so we are using `UxmlBoolAttributeDescription`.
1. Include an `Init` method in your `UxmlTraits` class that gets the values from the attributes and performs the desired action.

```csharp
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomScrollView : ScrollView
    {

        public bool hideScrollbars { get; set; }

        // ...

        public new class UxmlTraits : VisualElement.UxmlTraits
        {

            private readonly UxmlBoolAttributeDescription _hideScrollbars =
                new() { name = "hide-scrollbars", defaultValue = false };

            public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
            {
                base.Init(ve, bag, cc);

                if (ve is not CustomScrollView customScrollView)
                {
                    return;
                }

                customScrollView.hideScrollbars = _hideScrollbars.GetValueFromBag(bag, cc);

                if (!customScrollView.hideScrollbars)
                {
                    return;
                }

                customScrollView.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                customScrollView.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            }

        }

        // ...

    }

}
```

## Wrapping Up

Now that we understand how to create a custom UI Toolkit component, extend an existing one, extend the functionality, and add customizable attributes, let's put it together in one class.

```csharp
using UnityEngine.UIElements;

namespace Custom_UI_Elements_Namespace
{

    public class CustomScrollView : ScrollView
    {

        public bool hideScrollbars { get; set; }

        private bool _isMouseDown;

        public CustomScrollView()
        {
            RegisterCallback<MouseDownEvent>(OnMouseDown);
            RegisterCallback<MouseMoveEvent>(OnMouseMove);
            RegisterCallback<MouseUpEvent>(OnMouseUp);
        }

        public new class UxmlFactory : UxmlFactory<CustomScrollView, UxmlTraits>
        {

        }

        public new class UxmlTraits : VisualElement.UxmlTraits
        {

            private readonly UxmlBoolAttributeDescription _hideScrollbars =
                new() { name = "hide-scrollbars", defaultValue = false };

            public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
            {
                base.Init(ve, bag, cc);

                if (ve is not CustomScrollView customScrollView)
                {
                    return;
                }

                customScrollView.hideScrollbars = _hideScrollbars.GetValueFromBag(bag, cc);

                if (!customScrollView.hideScrollbars)
                {
                    return;
                }

                customScrollView.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                customScrollView.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            }

        }

        protected virtual void OnMouseDown(MouseDownEvent evt)
        {
            _isMouseDown = true;
        }

        protected virtual void OnMouseMove(MouseMoveEvent evt)
        {
            if (!_isMouseDown)
            {
                return;
            }

            scrollOffset -= evt.mouseDelta;
        }

        protected virtual void OnMouseUp(MouseUpEvent evt)
        {
            _isMouseDown = false;
        }

    }

}
```

If you want to give this code a try without needing to set up your own project, the GitHub repo <https://github.com/neogeek/Unity-UI-Toolkit-Custom-Elements> contains all of this code and a demo scene.
