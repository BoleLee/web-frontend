# ES实战

## Svelte 的前端

## 装饰路由

svelte / express / koa / decorator

## 前提

`npm install nodemon -g`
`npm install -g rollup`

## koa & express

### epress

express: node端，有一个 http 的模块（基于 net 的模块）（eventEmitter / stream 的模块）。
是一个后端框架

（图解 drawio）
洋葱模型：express.js 从上往下，再从下往上。当/访问时，打印顺序为

```bash
quering start 1
quering start 2
quering start 3
quering end 3
quering end 2
quering end 1
```

```js
// express.js
const express = require('express')

const app = express()
const PORT = 3000

app.use((req, res, next) => {
  console.log('quering start 1')
  next()
  console.log('quering end 1')
})

app.use((req, res, next) => {
  console.log('quering start 2')
  next()
  console.log('quering end 2')
})

app.use((req, res, next) => {
  console.log('quering start 3')
  next()
  console.log('quering end 3')
})

app.get('/', (req, res) => {
  res.send('hello grace')
})

app.listen(PORT, () => {
  console.log(`Example listening on port ${PORT}`)
})
```

```java
// 数据结构例子
public class User {
  private int id
  private String name

  public ArrayList<User> getUsers () {

  }
}
```

### koa

vite1 koa
vite2 connect

koa 是一个后端框架，是由express原班人马打造的，主要是轻量，插件分离出去了。

同样是洋葱模型，同上。koa.js
自言自语：
console.log()的东西，都是在node端看到，不在客户端（浏览器端），因为它是服务端的。

```js
// koa.js
const Koa = require('koa')

const app = new Koa()
const PORT = 3000

app.use(async (ctx, next) => {
  console.log('quering start 1')
  next()
  console.log('quering end 1')
})

app.use(async (ctx, next) => {
  console.log('quering start 2')
  next()
  console.log('quering end 2')
})

app.use(async (ctx, next) => {
  console.log('quering start 3')
  next()
  console.log('quering end 3')
})

const main = ctx => {
  ctx.body = 'hello grace'
}

app.use(main)
app.listen(PORT, () => {
  console.log(`Example listening on port ${PORT}`)
})
```

koa-server.js
写一个请求

```js
// koa-server.js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const PORT = 3000

router.get('/api', (ctx, next) => {
  ctx.type = 'application/json'
  ctx.body = {
    data: 'hello, grace'
  }
})

app.use(router.routes())
app.use(router.allowedMethods({}))

app.listen(PORT, () => {
  console.log('koa server is running...')
})
```

### 尝试在 node 中使用 esm

- type: 'module'
- .mjs

> 本节课，我们尝试使用 rollup 对 esm 打包，构建成 bundle, 然后实时执行这个 bundle

1）
rollup.config.js
src/index.js -> dist/bundle.js
plugins: babel

2）
nodemon 执行打包后的文件

3）yarn add core-js

输出demo: koa-src/

4）使用装饰器解析 controller
