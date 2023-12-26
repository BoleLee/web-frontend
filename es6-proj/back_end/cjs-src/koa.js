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
