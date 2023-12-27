import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { controllers } from './utils/decorators.js'
import Routes from './controller/index.js'

const app = new Koa()
const router = new Router()

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
