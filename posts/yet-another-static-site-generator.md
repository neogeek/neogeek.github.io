# Yet Another Static Site Generator

<div class="images">
  <figure>
    <a href="https://xkcd.com/927"><img src="https://imgs.xkcd.com/comics/standards.png" alt="A comic strip showing two people talking about existing standards and how there should be one to cover all of them, resulting in a new competing standard." /></a>
    <figcaption><a href="https://xkcd.com/927">https://xkcd.com/927</a></figcaption>
  </figure>
</div>

I've had a sorted past with static site generators. I've bounced between Jekyll, Eleventy, Next.js, Astro and even React and Handlebars each with custom build output tools. Each time I found it an arduous task to learn something new for such little reward.

So, after rebuilding my blog and portfolio with a different tool for the umpteenth time, I realized I wanted something different.

I like building simple static sites using HTML, CSS, and the occasional JavaScript. However, this method does not allow me to create HTML with external data sources dynamically.

So, without reaching for an existing solution, I went with one that didn't require installing anything to get to work: JavaScript string template.

So, I started with something really simple.

```javascript
process.stdout.write(`<h1>Hello, world!</h1>`);
```

Then, I redirected the results into a file using a bash script.

```bash
#!/bin/bash

node index.js > index.html
```

This wouldn't work if I were making a lot of files, so I looked into something more automated.

```bash
#!/bin/bash

find . -type f -name "*.mjs" | while read -r FILEPATH; do
  DIR=$(dirname "${FILEPATH}")
  FILENAME=$(basename "${FILEPATH}")

  HTML=$(cd "${DIR}" && node "${FILENAME}")

  DIRECTORY=""

  if [ "${FILENAME%.mjs}" == "index" ]; then
    DIRECTORY="build${DIR:1}"
  else
    DIRECTORY="build${DIR:1}/${FILENAME%.mjs}"
  fi

  mkdir -p "${DIRECTORY}"

  echo "${HTML}" > "${DIRECTORY}/index.html"
done
```

This script finds all of the `.mjs` files in the project's root and writes their output to a file. If the file is named `index.mjs`, it outputs the contents to `index.html`, but if it's named `example.mjs`, it outputs the contents to `example/index.html`.

I even threw in some syntax formatting for good measure.

```bash
echo "${HTML}" | npx prettier --parser html >"${DIRECTORY}/index.html"
```

With this script working and my site building, I realized I loved the simplicity of this flow. I didn't have to learn anything new; it was just JavaScript, and I could get a new site up and running quickly. But that's when I realized a flaw in my logic: passing around bash scripts and applying patches to each one when I add new features or fix bugs is not sustainable.

That's when I decided to take what I'd built, rebuild it in JavaScript, and publish it to NPM as a CLI tool.

So now I can do this:

```bash
npx onlybuild
```

This command achieves the same thing as my bash scripts without installing anything.

The CLI does include additional, but minimal, features like ignoring specific files or paths and copying static files. My goal for this project is to prevent building a system where anyone would have to refer to the documentation to get things to work.

Check it out on GitHub! <https://github.com/neogeek/onlybuild>
