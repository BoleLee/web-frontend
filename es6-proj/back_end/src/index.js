import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { controllers } from './utils/decorators.js'
import Routes from './controller/index.js'

const app = new Koa()
const router = new Router()

// cors
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, *')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  if (ctx.request.method.toLowerCase() === 'options') {
    ctx.state = 200
  } else {
    await next()
  }
})

app.use(bodyParser())

console.log('controllers: ', controllers)

controllers.forEach(item => {
  let { url, method, handler, constructor } = item
  const { prefix } = constructor
  if (prefix) url = `${prefix}${url}`
  console.log(url)
  router[method](url, handler)
})

app.use(router.routes())
app.use(router.allowedMethods({}))

app.listen(3000, () => {
  console.log('server is on 3000')
})
