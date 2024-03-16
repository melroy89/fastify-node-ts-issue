# TypeScript + Fastify ESM + Node-TS Demo

Working [TypeScript](https://www.typescriptlang.org/) + [SWC](https://swc.rs/) + [Fastify](https://fastify.dev/) + ES Modules + [Node-TS](https://www.npmjs.com/ts-node) demo. See workaround below.

First install deps via: `npm install`

Try to excute: `npm run dev` (this will use Node-TS + SWC)

Or run: `npm start`

A fast build using [SWC](https://swc.rs/), run: `npm run build`. If you want to use TSC compiler use: `npm run build:prod`, which does validate types.

---

_WORKAROUND:_ We currently apply a workaround by setting `VITEST=true` to force ESM in [Fastify-autoloader](https://github.com/fastify/fastify-autoload). So `npm run dev` is using:

```sh
FASTIFY_AUTOLOAD_TYPESCRIPT=1 VITEST=true node --no-warnings=ExperimentalWarning --loader ts-node/esm src/index.ts
```
