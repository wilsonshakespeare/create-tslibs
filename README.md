# create-tslib

One stop TypeScript libraries and applications boilerplate generator

## Quick Start

Following are the boilerplate option that are available:

- [tslib](#tslib)
- express (coming soon)
- styled-theme (coming soon)

replace the option as above to following command:

```shell
npx create-tslib --option=tslib --folder=your-lib-name

# --folder will be your application / library name
```

## tslib

This is a [TSDX](https://tsdx.io/) Extension setup is meant for developing __libraries (not apps!)__ that can be published to NPM. If you’re looking to build a Node app, you could use `ts-node-dev`, plain `ts-node`, or simple `tsc`.

### Why this extension?

1. Inclusive of scripts to generate flow types

2. Inclusive of scripts to generate multiple modules

3. Setup for airbnb standard (and remove conflicting linting plugins)

## Development Platform:
This tool is designed for VS Code platform.

Hence I suggest using [VS Code](https://code.visualstudio.com/download) as IDE:

The templates are already setup with vscode settings for auto format.

Ensure the following plugins are enabled:
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (This is setup with airbnb linting convention)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Add JSDoc Comment](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments#)

Optional but Recommended:
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Indenticator](https://marketplace.visualstudio.com/items?itemName=sirtori.indenticator)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=coenraads.bracket-pair-colorizer)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Publishing to NPM

Recommend using [np](https://github.com/sindresorhus/np).

### Happy Coding