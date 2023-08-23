> Minimal no-framework monorepo template built with Vite and React

## Features 

[![Deploy with Stormkit](https://www.stormkit.io/button.svg)](https://api.stormkit.io/deploy?template=https%3A%2F%2Fgithub.com%2Fstormkit-io%2Fmonorepo-template-react)

✔️ &nbsp;**Hybrid application:** Choose rendering method (SSG, SSR, SPA) based on routes

✔️ &nbsp;**API support:** Optional file-system routing support for API endpoints

✔️ &nbsp;**No framework:** React knowledge is enough to use this template

✔️ &nbsp;**SEO:** SEO tags included for SSR and SSG

✔️ &nbsp;**Compatible:** Build produces separate folders for client-side, server-side, and API. Highly compatible with hosting providers.

✔️ &nbsp;**HMR:** Hot module replacement support for all apps (SSR, SSG, SPA, API)

✔️ &nbsp;**Typescript:** Built-in TypeScript support

✔️ &nbsp;**Jest:** Built-in Jest support

## Getting started

This is a starter template for building applications with Vite and React. Click `use this template` and start working right away.

## Development

```
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm run dev
```

This will spawn an Express server that serves your application. Built-in Hot Module Replacement (HMR) support.

## How it works? 

In the local environment, [src/entry-server.tsx](./src/entry-server.tsx) is the entry point for the application. It uses 
`react-router` to understand what page to render. If the route exports a `fetchData` method, the component will be server-side-rendered. 
Otherwise, it will be client-side rendered. Data returned by `fetchData` will be made available to the component by [React Context](./src/context.ts).

See [src/pages/ssr.tsx](./src/pages/ssr.tsx) for an example.

## Static site generator

You can define which routes to prerender by modifying the [src/prerender.ts](./src/prerender.ts) file. During build time, the builder will be make a 
request to each route exported by this file and will take a snapshot of the HTML document.

## Single page app

By default, every route is a single-page application.

## API

The [src/api/](./src/api/) directory contains functions that act as API. The path to the file and the file name is used to determine the endpoint. 
The API is comptabile with [Stormkit](https://www.stormkit.io). [Check the docs](https://www.stormkit.io/docs/features/writing-api) for more information.

If you need to host the API elsewhere, you'll need to change the [vite.config.api.ts](./vite.config.api.ts) file and create a bundle from it. You may
also need to write an entry point that calls the appropriate function based on the route.

## Test

Jest is already preconfigured to work with this repository. Simply run:

```bash
$ npm run test
$ yarn test
$ pnpm run test
```

to execute all tests. You can add the `--watch` flag to keep listening to changes while testing:

```bash
$ npm run test -- --watch
$ yarn test --watch
$ pnpm run test --watch
```

## Community

Here's a curated list of websites using this framework. Please feel free to add your own:

| Site name | Description | 
| --------- | ----------- |
| [Stormkit.io](https://www.stormkit.io) | Deploy full stack javascript applications on the cloud | 
| [Feez.ws](https://www.feez.ws) | Track your progress in public | 

## License

MIT
