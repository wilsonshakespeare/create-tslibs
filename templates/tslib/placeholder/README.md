# JS Library (__LIB__)

Put your library short description here

## Install:

```shell
npm install __LIB__
```

### Upgrade:

```shell
# set specific version
npm install __LIB__@0.1.1
```

### Important for pure ES6

```javascript
// If uses require function you will need to use .default
// For import in typescript or flow, this is not required

const __LIB__ = require('__LIB__').default;
```

## Library Functions:

### Promise Related:

#### sleep

`await sleep(100)` will await for 100ms before proceed to next function

```ts
import __LIB__ from '__LIB__'

await __LIB__.sleep(100);

// will proceed after sleep for 100 ms
```

# This Library is Generated From create-tslibs

Can refer to [create-tslibs](https://www.npmjs.com/package/create-tslibs)

## To run development following will be recommended:

Use [VS Code](https://code.visualstudio.com/download) as IDE:

The library template is already setup with vscode settings for auto format.

Ensure the following plugins are enabled:
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (This is setup with airbnb linting convention)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Add JSDoc Comment](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments#)

Optional but Recommended:
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Indenticator](https://marketplace.visualstudio.com/items?itemName=sirtori.indenticator)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=coenraads.bracket-pair-colorizer)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## To bootstrap / create boilerplate run the following:

```shell
npx create-tslibs --option=tslib --folder=your-lib-name
```

There are other options coming up soon:
```
--option=express for express boilerplate
--option=styled-theme for styled components theme base with react projects

--folder will always be your library name
```

## AN extension to TSDX:

> This TSDX Extension setup is meant for developing libraries (not apps!) that can be published to NPM. If you’re looking to build a Node app, you could use `ts-node-dev`, plain `ts-node`, or simple `tsc`.

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Why this extension?

1. Inclusive of scripts to generate flow types

2. Inclusive of scripts to generate multiple modules

3. Setup for airbnb standard (and remove conflicting linting plugins)


## Multi module export:

Following are the steps for multi-module export

1. Add your ts file to --entry in `build.sh`

2. Add your output file to `size-limit` array in package.json

3. Only add your module at src root folder `src/module-name.ts` sub-folder `--entry` output is not desirable:
   sub functions or classes of a module can be in folders (make sure import at the main module, refer `promise.ts` as module)

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure set up for you:

Note: Keep each function as separate file:

```txt
/.vscode
  settings.json     # EDIT this if custom vs code setting is desired
/src
  /promise
    sleep.ts
  index.ts          # Import all individual modules, flatten it
  promise.ts        # For individual modules (promise related module)
/test               # Test individual functions
  /promise
    sleep.test.ts   # Import index.ts to ensure published library works
.gitignore
package.json
README.md           # EDIT Library Functions section
tsconfig.json       # For Compilation Purpose
tsconfig.lint.json  # Includes linting for test files
.eslintrc.js        # EDIT this if custom linting is desired
.prettierrc.js      # EDIT this if custom auto-format is desired
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

Recommend using [np](https://github.com/sindresorhus/np).

Important Note:
run `npm publish` for initial publish before running `np` commands
You may run into the following issue:

```shell
npm access 2fa-required create-tslibs
npm ERR! code E400
```