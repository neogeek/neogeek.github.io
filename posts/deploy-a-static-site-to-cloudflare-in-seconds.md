# Deploy a Static Site to Cloudflare in Seconds

Over the years I've promoted the use of Amazon S3 for hosting static websites. But the more I work with it, and the more I struggle helping people through the process of setting it up, the more I realize it's far too obnoxious for what you get out of it. Between setting up IAM policies, random Python errors via the CLI tool, and debugging deployments via CI platforms, I was frustrated and looking for alternatives.

> **Note:** This is not a paid endorsement for Cloudflare. I love how easy it is to get a static site online with their product compared to other platforms.

## Quick Start

If you have a static site ready to go you can be up and running in seconds (not kidding).

Run the following [Node.js](https://nodejs.org/) command in your terminal. Obviously, you still need to have [Node.js](https://nodejs.org/) installed, and if you don't, it might take a bit longer than a few seconds.

```bash
$ npx wrangler pages project create
```

Enter a name and hit enter.

Then run the following to upload your site to Cloudflare (changing the directory to match where your static files are):

```bash
$ npx wrangler pages deploy build/
```

If everything works as expected, you should have a website running at `<PROJECT_NAME>.pages.dev`! 🎉

## Automate Deployment via GitHub Actions

Navigate to <https://dash.cloudflare.com/profile/api-tokens> and hit **Create Token**.

Scroll to the bottom and press **Create Custom Token**.

1. Give the token a unique name.
2. Add the following permissions:
   - `Account` / `Cloudflare Pages` / `Edit`
   - `Zone` / `Cache Purge` / `Purge`
3. Set zone:
   - `Include` / `Specific Zone` / your domain name

Hit create, then confirm.

Copy the generated token and keep it somewhere safe.

Go to the setting page for your GitHub repo, then open **Secrets and Variables** > **Actions** in the sidebar. Add the following Repository Secrets:

| Name                    | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | The API you generated above.                                                   |
| `CLOUDFLARE_ACCOUNT_ID` | The account ID can be found on the overview page of your Cloudflare dashboard. |
| `CLOUDFLARE_ZONE_ID`    | The zone ID can be found on the overview page of your Cloudflare dashboard.    |

Then add the following GitHub workflow to `.github/workflows/deploy.workflow.yml`. Make sure to change the value of `projectName` to the name of your project and the value of `directory` if your static files are not in the `build/` directory.

```yaml
name: Deploy
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: the project name you specific earlier
          directory: build/
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
          branch: main

      - name: Clear Cloudflare Cache
        run: |
          curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CLOUDFLARE_ZONE_ID }}/purge_cache" -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" -H "Content-Type:application/json" --data '{"purge_everything":true}'
```

Now, whenever you push changes to your repo, your static site will be automatically deployed to Cloudflare Pages, and the cache will be flushed!
