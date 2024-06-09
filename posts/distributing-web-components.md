---
title: Distributing Web Components
subtitle: Distributing Web Components via NPM, UNPKG, CDN or embedding locally
date: 06/08/2024
draft: true
---

# Distributing Web Components

## NPM

```bash
$ npm install @neogeek/web-components --save
```

```json
{
  "name": "@neogeek/web-components",
  "exports": {
    "./CopyToClipboard": "./components/CopyToClipboard.js"
  }
}
```

```javascript
import '@neogeek/web-components/CopyToClipboard';
```

## UNPKG

```html
<script
  src="http://unpkg.com/@neogeek/web-components/components/CopyToClipboard.js"
  defer
></script>
```

## CDN

```html
<script
  src="http://cdn.neogeek.dev/web-components/components/CopyToClipboard.js"
  defer
></script>
```

## Embedded Locally

```javascript
import './web-components/CopyToClipboard';
```
