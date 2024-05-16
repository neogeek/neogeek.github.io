# Let's Make Web Components Happen

<div class="images">
  <figure>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnN4dXAxM2FkdTR3cW9jeTlwN3IxamlkMmN4NTIwa2ZyZmR0amV2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XBEoaajXTXaALzawSn/giphy.gif" alt="Shot from Mean Girls." />
    <figcaption>Stop trying to make Web Components happen!<br>It's not going to happen.</figcaption>
  </figure>
</div>

I've checked in with [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components) every couple of years to see how they are doing. Are you popular? Are you easy to use yet? Typically, I come back with "no" and "not really."

Introduced in 2011, Web Components seemed like the wave of the future. Especially when Google announced [Polymer](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview) in 2013, mainstream adoption seemed just around the corner.

But it wasn't.

I don't think there is a definite answer, but if I were to wager a guess, it would be because they are not easy to work with. It is not as easy as HTML template languages and frameworks that have come and gone, and certainly not any easier than working with React or Angular.

So why the interest? Because Web Components can be as powerful as React components, without a build step and I feel like that alone should be enough to make Web Components more popular.

There are new libraries out there that make working with Web Components easier, like [Lit](https://lit.dev/), but like most of these libraries, it introduces a build step.

So, what does it look like to author your own Web Component without an extra library or build step? It's not as easy or as hard as you might think.

Let's take a look!

## First Component

The following example Web Component has no functionality aside from logging to the console when it loads in the DOM.

There are three parts to this code snippet:

1. Using the Web Component as an HTML tag `<example-element>`.
1. Extending the class `HTMLElement` and overriding the base class method `constructor` and making sure to call `super()` to run the logic in the base class `constructor`.
1. Registering the Web Component using `customElements.define`.

And as there is no build step you can include this script in any page where you want to use the `<example-element>` Web Component.

```html
<example-element>test</example-element>

<script>
  class ExampleElement extends HTMLElement {
    constructor() {
      super();

      console.log('Example element added to page.');
    }
  }

  customElements.define('example-element', ExampleElement);
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/neogeek/embed/ExzVQNa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## Add Functionality

Next, let's add something to the Web Component to make it react to the content within it.

In this example, we take the text contents of the Web Component tag and convert them to uppercase letters.

We use `this` to reference the root of the Web Component itself.

```html
<uppercase-element>test</uppercase-element>

<script>
  class UpperCaseElement extends HTMLElement {
    constructor() {
      super();

      this.innerText = this.innerText.toUpperCase();
    }
  }

  customElements.define('uppercase-element', UpperCaseElement);
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/neogeek/embed/VwOvQPp?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## Adding Styles

In this example, we introduce the concept of the shadow DOM, a feature of the browser that uses all existing DOM tags like `<input>` and `<select>`.

1. Store a reference to the shadow DOM.
1. Create and attach a style tag with styles for changing all of the text colors to red.
1. Copy all child nodes into a root element and append that root element to the shadow DOM.

```html
<styled-element>test</styled-element>

<script>
  class StyledElement extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');

      style.appendChild(document.createTextNode(`* { color: red; }`));

      shadow.appendChild(style);

      const div = document.createElement('div');

      shadow.appendChild(div);

      this.childNodes.forEach(childNode => div.appendChild(childNode));
    }
  }

  customElements.define('styled-element', StyledElement);
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/neogeek/embed/bGyVLam?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## Interaction

For the final example, we will take an example often found in React tutorials where we have a button that updates a number, showing how often it's been clicked.

1. Store a variable with the current times the button was clicked.
1. Append a button to the shadow DOM.
1. Set an event listener to fire when clicked, that increments the count and updates the contents of the button.

```html
<interaction-element></interaction-element>

<script>
  class InteractionExample extends HTMLElement {
    count = 0;

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const button = document.createElement('button');

      button.appendChild(document.createTextNode('Click me'));

      button.addEventListener('click', e => {
        this.count += 1;

        button.innerText = `You clicked me ${this.count} times!`;
      });

      shadow.appendChild(button);
    }
  }

  customElements.define('interaction-element', InteractionExample);
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/neogeek/embed/MWdaVKy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

That's it for now!

I'll be sure to check back in a few years and see how things are going with Web Components. For now, I'll probably try to integrate some small-footprint Web Components into my work and maybe even check out React's new Web Component support.
