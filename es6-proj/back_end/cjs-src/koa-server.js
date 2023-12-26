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
