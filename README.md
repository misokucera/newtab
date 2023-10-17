# Newtab extension

Simple extension to show bookmark directories on new tab page.

## Support

Currently, only supported browser is Google Chrome.

## Basic usage

Visit chrome extension store (link will be provided in short future, extension is not published yet).

If you wish to create your own copy of extension and run it locally:

1. Run `npm run export` to export extension to `out` directory.
2. Open `chrome://extensions/` in browser and enable `Developer mode`
3. Load exported directory with `Load unpacked`
4. Extension is ready to use and should replace existing new tab

## Development

Project is based on [next.js](https://github.com/vercel/next.js). To start development server run `next dev`.

## Roadmap

-   Add dark mode and/or multiple simple themes.
-   Add tabs to switch between multiple spaces (e.g. workspace or home).
-   Better testing data for development and automated tests.
