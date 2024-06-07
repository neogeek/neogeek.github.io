# Web Components vs. the World

<div class="image">
  <figure>
    <img src="/images/web-components-vs-the-world/header.svg" alt="The phrase Web Components on the left with the right populated with five different logos of other javascript frameworks like React and Angular." />
  </figure>
</div>

This isn't a "Web Components is the only way to make components" post, and neither was my [last post](/lets-make-web-components-happen/). This is an attempt to present you (and myself) with as close to a 1-to-1 comparison of select frameworks so you can decide which one is best for you and your project.

Each snippet below contains a button with an event handler that, when clicked, increments a value, and that change to the value appears within the button's label.

## [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components)

```javascript
class InteractionExample extends HTMLElement {
  count = 0;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const button = document.createElement('button');

    button.appendChild(
      document.createTextNode(`You clicked me ${this.count} times!`)
    );

    button.addEventListener('click', e => {
      this.count += 1;

      button.innerText = `You clicked me ${this.count} times!`;
    });

    shadow.appendChild(button);
  }
}

customElements.define('interaction-example', InteractionExample);
```

## [React](https://react.dev/)

```javascript
import { useState } from 'react';

export default function Button() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count => count + 1);

  return <button onClick={handleClick}>You clicked me {count} times!</button>;
}
```

## [Solid.js](https://www.solidjs.com/)

```javascript
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

const [count, setCount] = createSignal(0);

const handleClick = () => setCount(count() + 1);

render(
  () => <button onClick={handleClick}>You clicked me {count()} times!</button>,
  document.getElementById('app')
);
```

## [Vue.js](https://vuejs.org/)

```html
<script setup>
  import { ref } from 'vue';
  const count = ref(0);
</script>

<template>
  <button @click="count++">You clicked me {{count}} times!</button>
</template>
```

## [Svelte](https://svelte.dev/)

```html
<script>
  let count = 0;

  const handleClick = () => count++;
</script>

<button on:click="{handleClick}">You clicked me {count} times!</button>
```

## [Angular](https://angular.io/)

```javascript
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'add-one-button',
  standalone: true,
  template: `<button (click)="count = count + 1">
    You clicked me {{ count }} times!
  </button>`
})
export class AddOneButtonComponent {
  count = 0;
}

bootstrapApplication(AddOneButtonComponent);
```

As to which one I prefer, my choices are Web Components (obviously) and React. My choice of React is primarily due to exposure via personal and client projects.

I'm not much of a fan of magic. Or, more clearly put, I'd rather work with functional programming and built-in JavaScript functionality over most things.
