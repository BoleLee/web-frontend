import Koa from 'koa'
import book from './book.js'
import user from './user.js'

const app = new Koa()
const PORT = 3000;

[book, user].forEach(router => {
  app.use(router.routes())
  app.use(router.allowedMethods({}))
});

app.listen(PORT, () => {
  console.log('koa server is running...')
})
