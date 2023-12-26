import { Controller, RequestMapping, RequestMethod } from '../utils/decorators.js'

@Controller('/book')
export default class BookController {
  @RequestMapping(RequestMethod.GET, '/all')
  async getAllBooks (ctx, next) {

  }
}