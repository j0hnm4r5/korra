# Korra

> ✨ JavaScript linter and formatter.

[![License MIT](https://img.shields.io/badge/license-MIT-red.svg)](/LICENSE)
[![Prettier](https://img.shields.io/badge/style-prettier-ff69b4.svg)](https://prettier.io/)
[![Zoe](https://img.shields.io/badge/linter-korra-5F5FFF.svg)](https://github.com/jorgegonzalez/zoe)

## Features

- **No configuration**. Just install Korra and you're ready to go.
- **Prettier** and **eslint-config-airbnb**.
- Out of the box support for **React** and **Flow**.
- Fix issues by running `korra --fix`.
- 100% extensible. If you don't like a rule, you can easily change it.
- _(coming soon: out of the box support for TypeScript)_

## Installation and Usage

```sh
yarn global add korra
```

Run `korra` in a project to output errors:

<img src="https://i.imgur.com/4u4nVzk.png" alt="korra">

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
    "env": ["jest"],
    "globals": ["graphql"]
  }
}
```

You can set any of the following options:

### `rules`

Type: `Object`

Override rules in the [default config](https://github.com/jorgegonzalez/korra/blob/master/src/eslintrc.json). See the [ESLint docs](http://eslint.org/docs/rules/) for more info on each rule. See

### `envs`

Type: `Array`

Default: `['node', 'browser']`

An environment defines global variables that are predefined. See [Specifying Environments](http://eslint.org/docs/user-guide/configuring#specifying-environments).

### `globals`

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
    "plugins": [ "typescript" ]
  }
}
```

I am working on adding TypeScript support with no extra steps.

## Included Dependencies, Configs, and Plugins

Korra is not a light package, and will include all of the following dependecies (and then some) when it is installed:

* `babel-eslint`
* `eslint`
* `eslint-config-airbnb`
* `eslint-config-prettier`
* `eslint-formatter-pretty`
* `eslint-plugin-flowtype`
* `eslint-plugin-import`
* `eslint-plugin-jsx-a11y`
* `eslint-plugin-no-use-extend-native`
* `eslint-plugin-prettier`
* `eslint-plugin-promise`
* `eslint-plugin-react`
* `eslint-plugin-unicorn`
* `prettier`

This is necessary so that Korra can be truly zero-config. Including these dependencies instead of forcing a user to manually install them helps with that goal.

## Prior Art

Korra started off as a fork of [Standard](https://github.com/standard/standard) with `eslint-config-airbnb` as the default ruleset and some modifications to make it more configurable. Korra is also heavily based on [XO](https://github.com/xojs/xo).

## License

[MIT](/LICENSE) © [Jorge Gonzalez](https://jorgegonzalez.io)
