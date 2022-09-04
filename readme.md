# `ever-smv-dao`

## Develop environment require

- `POSIX` (bash, grep, cut, sort, etc)
- `nvm` https://github.com/nvm-sh/nvm
- `yarn` https://yarnpkg.com/getting-started/install
- `docker` https://docs.docker.com/engine/install

### Dependencies

```shell
nvm use $(yarn --ignore-engines --silent nvm)
yarn install
```

## Develop

```shell
yarn contract-build
yarn test
```

### Deploy

```shell
yarn contract-deploy-local
```

or

```shell
yarn contract-deploy-local
```
