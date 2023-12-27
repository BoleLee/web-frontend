# ES实战

svelte / express / koa / decorator

## Svelte 的前端

体验下svelte写一个项目，熟悉下其语法，如循环 {#each arr as item} {/each}

## 装饰路由 decorator

- **装饰器的本质，是对类的行为的改变**，在代码编译时发生的，也不是运行时
- 编译器执行的函数

通过收集controllers，体会下装饰器的用途

## 全局安装工具

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

## 尝试在 node 中使用 esm

- type: 'module'
- .mjs

> 尝试使用 rollup 对 esm 打包，构建成 bundle, 然后实时执行这个 bundle

1）
rollup.config.js
src/index.js -> dist/bundle.js
plugins: babel

2）
nodemon 执行打包后的文件

3）yarn add core-js

输出demo: koa-src/

4）使用装饰器收集 controller

```js
// bookController.js
import { Controller, RequestMapping, RequestMethod } from '../utils/decorators.js'

@Controller('/book')
export default class BookController {
  @RequestMapping(RequestMethod.GET, '/all')
  async getAllBooks (ctx, next) {
    ctx.body = {
      data: 'get all books'
    }
  }

  @RequestMapping(RequestMethod.GET, '/delete')
  async deleteBook (ctx, next) {
    ctx.body = {
      data: '删除book'
    }
  }
}
```

```js
// decorators.js
export const RequestMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  OPTION: 'option',
  PATCH: 'patch'
}

export const controllers = []

// 装饰器的本质，是对类的行为的改变，在代码编译时发生的，也不是运行时
// 编译器执行的函数
export function Controller (prefix = '') {
  return function (target) {
    // 给 controller 添加路由的前缀
    console.log('给 controller 添加路由的前缀: ', target)
    target.prefix = prefix
  }
}

export function RequestMapping (method = '', url = '') {
  return function (target, name, descriptor) {
    // 如果没有定义 url, 就以函数名称作为借口
    let path = url || name

    controllers.push({
      url: path,
      method: method,
      handler: target[name],
      constructor: target.constructor
    })
  }
}
```

5）对接前端联调

(TODO)

初始化一个 svelte app, 使用路由。
编译配置：`svelte.config.js, tailwind.config.js`

后端koa加个中间件cors解决请求CORS，`app.use()`

svelte的一些语法：

```svelte
{#each arr as item }

{/each}

<!-- tailwind 样式配置 -->
<!-- 分列 -->
w-1/12
w-1/12
w-8/12
w-1/12
```

至此基本完成一个含前后端的小项目，暂无鉴权。输出：`es6-proj/`
