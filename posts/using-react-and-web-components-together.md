# Using React and Web Components Together

<div class="images">
  <figure>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2xvZjhyZjl1NTFveHZ1dGFqNXhwZDQ3cm50M3p4MzF5NHdrNnZvNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l36kU80xPf0ojG0Erg/giphy.gif" alt="Spider-man pointing at Spider-man, pointing at Spider-man." />
    <figcaption>Spider-man pointing at Spider-man, pointing at Spider-man.</figcaption>
  </figure>
</div>

If you have been tuning in, you might have noticed that I have a [passing](/lets-make-web-components-happen) [interest](/web-components-vs-the-world) in Web Components and what makes them tick. Professionally, however, I primarily use React to build complex websites. So, how would one merge these two worlds without causing too much disruption?

## The Plan

For this, we are going to use a tried and tested example: the "button with a counter". Below is an example of a "button with a counter" Web Component from my [Let's Make Web Components Happen](/lets-make-web-components-happen) article (with slight modifications).

```javascript
class InteractionExample extends HTMLElement {
  count = 0;

  button;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    this.button = document.createElement('button');

    this.button.appendChild(document.createTextNode('Click me'));

    this.button.addEventListener('click', e => {
      this.count += 1;

      this.button.innerText = `You clicked me ${this.count} times!`;
    });

    shadow.appendChild(this.button);
  }
}

customElements.define('interaction-example', InteractionExample);
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/neogeek/embed/MWdaVKy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

Now, to get this component to work in React, we have to do a few things.

1. Import the JavaScript file directly into the file it's being used in.
   ```typescript
   import './web-components/InteractionExample';
   ```
2. (Optional) Setup the TypeScript types.
   ```typescript
   declare namespace JSX {
     interface IntrinsicElements {
       'interaction-example': {};
     }
   }
   ```

Once we have those changes, we can use our Web Component directly in React!

```typescript
import './web-components/InteractionExample';

function App() {
  return (
    <>
      <interaction-example></interaction-example>
    </>
  );
}

export default App;
```

But wait, there is more. So, so much more.

## Events From Web Components

We currently have a `count` value in our Web Component, but we don't have a way of getting it out of the Web Component and into React. We can fix this by firing an event similar to an `<input/>` changed event when the count changes.

We do this by calling [`dispatchEvent`](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent) with a [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent/CustomEvent) from within our click handler.

```javascript
this.dispatchEvent(
  new CustomEvent('update-count', {
    detail: this.count
  })
);
```

In React, we need to set up a couple of things.

1. We need a reference for the Web Component. To do this, we import `useRef` from React and add it to the Web Component in the JSX.

   ```typescript
   import { useRef } from 'react';

   import './web-components/InteractionExample';

   function App() {
     const ref = useRef(null);

     return (
       <>
         <interaction-example ref={ref}></interaction-example>
       </>
     );
   }

   export default App;
   ```

1. With that reference, we can now set up the event listener.

   ```typescript
   useEffect(() => {
     if (!ref.current) {
       return;
     }

     const updateCountHandler = (e: CustomEvent<number>) => {
       console.log(e.detail);
     };

     ref.current.addEventListener('update-count', updateCountHandler);

     return () => {
       ref.current?.removeEventListener('update-count', updateCountHandler);
     };
   }, []);
   ```

If you are using TypeScript, you might nave noticed some <mark class="invalid">errors</mark> due to invalid types. Let's sort those out.

The first error is regarding the <code class="invalid">ref=</code><code>{ref}</code> attribute on the Web Component. This is because the JSX type is missing the correct attribute declaration. We can solve this by editing our type declaration and adding an optional `ref` attribute with the React type of `RefObject`.

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'interaction-example': {
      ref?: React.RefObject<HTMLElement>;
    };
  }
}
```

The other error is regarding the <code>ref.current.</code><code class="invalid">addEventListener</code> and <code>ref.current?.</code><code class="invalid">removeEventListener</code> method calls. This is because our `updateCountHandler` method has a `CustomEvent<number>` type, but that's not the default for event listener methods.

We can correct this by adding a type that extends `HTMLElement`.

```typescript
type InteractionExample = HTMLElement & {
  addEventListener(
    type: 'update-count',
    listener: (this: HTMLElement, ev: CustomEvent<number>) => any,
    options?: AddEventListenerOptions
  ): void;
  removeEventListener(
    type: 'update-count',
    listener: (this: HTMLElement, ev: CustomEvent<number>) => any,
    options?: AddEventListenerOptions
  ): void;
};
```

Once the types have been updated, we can go back to React and update the reference we have to point to for the new type.

```typescript
const ref = useRef<InteractionExample>(null);
```

So now that we have all of that setup, we can _finally_ show the results on the page and not just in the console.

We do this by adding a `useState` variable to store the count value and render it alongside the Web Component button.

```typescript
import { useEffect, useRef, useState } from 'react';

import './web-components/InteractionExample';

function App() {
  const ref = useRef<InteractionExample>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateCountHandler = (e: CustomEvent<number>) => {
      if (e.detail !== count) {
        setCount(e.detail);
      }
    };

    ref.current.addEventListener('update-count', updateCountHandler);

    return () => {
      ref.current?.removeEventListener('update-count', updateCountHandler);
    };
  }, []);

  return (
    <>
      <h1>
        Count: <code>{count}</code>
      </h1>
      <interaction-example ref={ref}></interaction-example>
    </>
  );
}

export default App;
```

## Events From React

So we have data flowing from the Web Component back to React, but we don't have a way of sending data back the other way.

First things first, we need to be able to set the count with an attribute on the Web Component. We do this by adding two things to our Web Component:

1. Overriding the static property `observedAttributes` in our Web Component class.

   ```javascript
   class InteractionExample extends HTMLElement {
     static observedAttributes = ['count'];
   }
   ```

1. Overriding the `attributeChangedCallback` method.

   ```javascript
   attributeChangedCallback(name, oldValue, newValue) {
     if (name === 'count') {
       const parsedValue = parseInt(newValue, 10);

       if (!Number.isNaN(parsedValue) && parsedValue !== this.count) {
         this.count = parsedValue;

         this.button.innerText = `You clicked me ${this.count} times!`;
       }
     }
   }
   ```

Then, we update the type declaration to include the new attribute.

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'interaction-example': {
      ref?: React.RefObject<HTMLElement>;
      count?: number;
    };
  }
}
```

Now, we can set the initial value of the count in React using our state value and include a button to change the count value in React.

```typescript
return (
  <>
    <h1>
      Count: <code>{count}</code>{' '}
      <button onClick={() => setCount(count => (count += 1))}>+</button>
    </h1>
    <interaction-example count={count} ref={ref}></interaction-example>
  </>
);
```

## Final Result

You can try out the final result on [CodeSandbox](https://codesandbox.io/p/sandbox/using-react-and-web-components-l4p8gq).

<iframe src="https://codesandbox.io/embed/l4p8gq?view=preview&module=%2Fsrc%2Fweb-components%2FInteractionExample.js&expanddevtools=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="using-react-and-web-components"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
