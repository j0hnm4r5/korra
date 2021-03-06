<p align="center">
  <img src="media/Logo.png" alt="Korra Logo" width="500px" />
</p>

> ✨ Universal JavaScript linter and formatter.

[![License MIT](https://img.shields.io/badge/license-MIT-red.svg)](/LICENSE)
[![Prettier](https://img.shields.io/badge/style-Prettier-ff69b4.svg)](https://prettier.io/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Zoe](https://img.shields.io/badge/linter-Korra-5F5FFF.svg)](https://github.com/jorgegonzalez/korra)

## Features

- **No configuration necessary**. Just install Korra and you're ready to go.
- Defaults to **[Prettier](https://github.com/prettier/prettier)** for formatting rules and **[eslint-config-airbnb](https://github.com/airbnb/javascript/)** for code-quality rules (with a few rules turned off). Check out the [config](/eslintrc.json).
- Out-of-the-box support for **React**, **Flow**, and **Jest**. No need to manually install any additional plugins or configs.
- Fix issues by running `korra --fix`.
- Completely configurable and extensible. If you don't like a rule, you can easily change it.
- Includes [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise) and [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) for some additional goodies.
- _(coming soon: out-of-the-box support for TypeScript)_

## Installation and Usage

Install Korra globally with `yarn`:

```sh
yarn global add korra
```

or with `npm`:

```sh
npm install --global korra
```

Run `korra` in a project to output errors:

<img src="https://i.imgur.com/4u4nVzk.png" alt="korra">

You may also want to install Korra locally as a `devDependency`:

```sh
yarn add --dev korra
```

or:

```sh
npm install --save-dev korra
```

Run Korra by adding it to `package.json#scripts`:

```json
{
  "name": "my-app",
  "scripts": {
    "lint": "korra",
    "format": "korra --fix"
  }
}
```

Running `yarn lint` or `npm run lint` will print errors, and running `yarn format` or `npm run format` will fix all auto-fixable errors.

## Configuration

Korra reads options set in your `package.json`:

```json
{
  "name": "my-app",
  "korra": {
    "rules": {
      "unicorn/filename-case": "off",
      "import/newline-after-import": "off"
    },
    "envs": ["ava"],
    "globals": ["graphql"]
  }
}
```

Or in a file named `.korrarc`:

```json
{
  "rules": {
    "unicorn/filename-case": "off",
    "import/newline-after-import": "off"
  },
  "envs": ["ava"],
  "globals": ["graphql"]
}
```

or

```yaml
---
rules:
  unicorn/filename-case: 'off'
  import/newline-after-import: 'off'
envs:
- ava
globals:
- graphql
```

You can also name the file `.korrarc.json` or `.korrarc.yaml`, or export a JS object with `.korra.config.js`.

Rules set in `package.json` will overrule those set in `.korrarc`, which will overrule those set in `.korrarc.json` or `.korrarc.yaml`.

You can set any of the following options:

#### `rules`

Type: `Object`

Override rules in the [default config](https://github.com/jorgegonzalez/korra/blob/master/src/eslintrc.json). See the [ESLint docs](http://eslint.org/docs/rules/) for more info on each rule. See

#### `envs`

Type: `Array`

Default: `['node', 'browser']`

An environment defines global variables that are predefined. See [Specifying Environments](http://eslint.org/docs/user-guide/configuring#specifying-environments).

#### `globals`

Type: `Array`

Additional global variables your code accesses during execution. See [Specifying Globals](https://eslint.org/docs/user-guide/configuring#specifying-globals).

#### `parser`

Type: `string`

Default: `'babel-eslint'`

ESLint parser. See [Specifying Parser Options](https://eslint.org/docs/user-guide/configuring#specifying-parser-options).

### Prettier

Changing Prettier-related options can also be done in your `package.json`.

```json
{
  "name": "my-app",
  "korra": {
    "rules": {
      "unicorn/filename-case": "off",
      "import/newline-after-import": "off"
    }
  },
  "prettier": {
    "semi": false,
    "trailingComma": "all"
  }
}
```

Or in a `.prettierrc` file in your project's root:

```json
{
  "semi": false,
  "trailingComma": "all"
}
```

See [Configuring Prettier](https://prettier.io/docs/en/options.html) for all options.

_Options in `package.json#prettier` will take precedence over a `.prettierrc` file._

### TypeScript

Basic TypeScript support can be enabled by installing `typescript-eslint-parser` and `eslint-plugin-typescript`:

```sh
yarn add --dev typescript-eslint-parser eslint-plugin-typescript
```

Then, add the following to your `package.json`:

```json
{
  "korra": {
    "parser": "typescript-eslint-parser",
    "plugins": ["typescript"]
  }
}
```

I am working on adding TypeScript support with no extra steps.

## Editor Integration

Korra does not have a dedicated editor plugin (yet!). What you can do for now is point your editor's native ESLint plugin to your local Korra `eslint` config:

1.  Install Korra locally (`yarn add --dev korra` or `npm install --save-dev korra`)

2.  Install your editor's native ESLint plugin (for Visual Studio Code that's [vscode-eslint](https://github.com/Microsoft/vscode-eslint))

3.  In your editor's settings, point your ESLint plugin to Korra's local config file: `node_modules/korra/eslintrc.json`

    - In Visual Studio Code you would set this in `eslint.options#configFile`:

    ```json
    "eslint.options": {
      "configFile": "node_modules/korra/eslintrc.json"
    }
    ```

:warning: **Caveat** :warning:: Custom rules in your `package.json` or `.korrarc` will not work with this method. See [Issue #7](https://github.com/jorgegonzalez/korra/issues/7#issuecomment-405069251) for more details.

## Included Dependencies, Configs, and Plugins

Korra is not a light package, and will include all of the following dependecies (and then some) when it is installed:

- `babel-eslint`
- `eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-formatter-pretty`
- `eslint-plugin-flowtype`
- `eslint-plugin-import`
- `eslint-plugin-jest`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-no-use-extend-native`
- `eslint-plugin-prettier`
- `eslint-plugin-promise`
- `eslint-plugin-react`
- `eslint-plugin-unicorn`
- `prettier`

This is necessary so that Korra can be truly zero-config. Including these dependencies instead of forcing a user to manually install them helps with that goal.

## Prior Art

Korra started off as a fork of [Standard](https://github.com/standard/standard) with `eslint-config-airbnb` as the default ruleset and some modifications to make it more configurable. Korra is also heavily based on [XO](https://github.com/xojs/xo).

## License

[MIT](/LICENSE) © [Jorge Gonzalez](https://jorgegonzalez.io)
