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