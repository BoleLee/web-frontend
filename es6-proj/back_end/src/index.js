import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { controllers } from './utils/decorators.js'
import Routes from './controller/index.js'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

console.log('controllers: ', controllers)

app.listen(3000, () => {
  console.log('server is on 3000')
})
