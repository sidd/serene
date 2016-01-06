# Setup

Setting up Serene is meant (in other words, eventually) to be as simple as possible. Currently, the setup process requires a bit of work, but this will be alleviated as time goes on.

A simplified version of the steps required:

  * Clone this repo onto any web server (or your local machine). This step (which requires Git) is cumbersome and will utilize NPM in the future.
  * Bundle your providers
  * Serve the static directory

## Clone the repo

```
$ git clone https://github.com/sidd/serene.git && cd serene
```

## Bundle your providers

A pre-built bundle **already exists** in the public/dist/ directory, and this contains an rTorrent & WebTorrent provider.

If you want to bundle other providers, or remove ones you don't use, you'll have to create a new bundle yourself. Be sure to drag in all of the necessary dependencies for bundling via `npm install` (which will take a bit), and then see [README.md](https://github.com/sidd/serene#installation) for a quick overview on the bundling process.

## Serve the static directory

Now that your bundle is ready, all you need to do is serve the `public/` directory! Use something like [ecstatic](https://npmjs.com/package/ecstatic) to do this, or any traditional HTTP server (Node does not need to be running on your server).
