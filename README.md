# Fastify ESM + Node-TS

Reproduction scenario repository showing the Fastify issue with `Node-ts/esm`.

First install deps via: `npm install`

Try to excute: `npm run dev` (Gives error: `cannot use import statement outside a module`).

`npm run dev` executes [nodemon](nodemon.json)  which then execute the following line in the [`package.json` file](./package.json):

```sh
FASTIFY_AUTOLOAD_TYPESCRIPT=1 node --no-warnings=ExperimentalWarning --loader ts-node/esm src/index.ts
```

Yes. I'm already using `FASTIFY_AUTOLOAD_TYPESCRIPT=1`.

**Note:** You will notice that: `npm start` works just fine (just `tsc` without node-ts). Meaning Typescript code is correct.

---

_EDIT:_ Workaround is currently to also set `VITEST=true` to force ESM in [Fastify-autoloader](https://github.com/fastify/fastify-autoload). So it becomes:

```sh
FASTIFY_AUTOLOAD_TYPESCRIPT=1 VITEST=true node --no-warnings=ExperimentalWarning --loader ts-node/esm src/index.ts
```
