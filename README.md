# Build Setup

```bash
# install dependencies
# (if package-lock.json file exists)
$ npm ci 
# or if not 
$ npm i

# create .env file with default values
$ cp example.env .env

# serve with hot reload at localhost:3000
$ npm run dev
```

# Environment Requirements
node version: `v14.xx.xx` <br/>
npm version: `v6.xx.xx` <br/>

# Before you start
Before starting the project, you can delete the ``store/web3`` files, all pages in the pages folder, and the ``default-header-adaptive-example`` layout.
All these files are just an example of how to work with the erc20 token contract

# Style guide
The project uses husky, commitlint and eslint.
When you try to commit, the eslint autofix is launched and if the fix does not pass, then the commit will not pass. Linter will only check the files that you have added to the stage.
Also, commits are checked for compliance with the rules from [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Conventional commits
The Conventional Commits specification provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of.<br/>
The commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
As an `optional scope`, you can use the issue number from redmine. You can also add refinements to the scope, if necessary (see the example below).
In most cases, the following structure will suffice:
```
<type>[optional scope]: <description>

Example:
git commit -m 'feat(23451/redesign): Redesign header and add mobile version of header'
```

Possible types of commits: <br/>
`build` - Building a project or changing external dependencies <br/>
`ci` - Setting up CI and working with deployment scripts <br/>
`docs` - Updating the documentation, adding comments to the code <br/>
`feat` - Adding new functionality <br/>
`fix` - Correction of errors and bugs <br/>
`hotfix` - Fixing bugs that are accepted without opening a pull request <br/>
`perf` - Changes aimed at improving performance, reducing the build, etc. <br/>
`refactor` - Editing code without fixing bugs or adding new features. When changes were made to improve readability, extensibility and cleanliness of the code, but without changing the old logic <br/>
`revert` - Rollback to previous commits<br/>
`style` - Code style edits (tabs, indents, dots, commas, etc.). Edits made by linters, etc.<br/>
`test` - Everything related to unit tests, integration tests, etc.<br/>
`chore` - routine tasks (if none of the types above fit)<br/>

## lint-staged
[lint-staged](https://www.npmjs.com/package/lint-staged) - a package with which you can check with a linter only those files that have been added to stage. `lint-staged` runs the `npm run lintfix` command. The config for `lint-staged` is located at the root of the project and is called `.lintstagedrc`

## What if you don't need conventional commits and lint-staged?
If for some reason you don't need to follow the commit conventions and you don't need linter checks before committing, then you need to do the following.

1. Remove packages: `@commitlint/cli`, `@commitlint/config-conventional`, `husky` and `lint-staged`. <br/>
2. Delete `commitlint.config.js`, `.lintstagedrc` files and `.husky` folder. <br/>
3. Remove `prepare` and `pre-commit` scripts in package.json. <br/>

# File structure

## api
`ApiService` - base class that implements the logic of requests to the server.

### rest
This folder stores services that implement requests and data processing logic for subsequent transfer of this data to components or store

### ws
This folder contains the class for connecting via websocket

## core
Everything related to web3 and contracts is stored here

### abis
All abi are stored in this folder

### configs
This folder stores all configs related to web3 and smart contracts

### contracts
`BasicContract` - must be the parent class for all smart contract implementations. In child classes for obtaining data from a smart contract (view methods), you need to use the `fetchContractData` and `fetchContractDataByWallet` methods. To call a smart contract method, use `sendDataToContract`.
`fetchContractData` - method for calling view contract functions using an anonymous connection as a provider (eg infura).
`fetchContractDataByWallet` - method for calling view contract functions using a wallet as a provider (for example, Metamask, Coinbase, etc.).

`Token` is an example of an implementation of a class that implements a erc20 token contract.

### ConnectionWeb3
`ConnectionWeb3` - a singleton class that implements the wallet connection logic. To get a class instance, call the `getInstansce` method instead of using the `new` operator. Attempting to instantiate a class using the `new` operator will result in an error.

### helpers
Here are collected functions with which you can interact with the smart contract (creating an instance, calling view methods and sending data to the contract). In large projects, it is recommended to implement a class that implements a smart contract, as is done in the `Token.ts` example. In small projects, it is possible not to create a class for a smart contract, but to perform all interaction with smart contracts in the `store` + `helpers` bundle.

## utils
This folder is intended for small utility functions that are often used on the project. For example, debounce, trottle. Also here you can store files with constants

## locales
This folder stores localization json files  and configs associated with localizations (for example, config with date format in different locales)
