(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('core-js/modules/esnext.async-iterator.for-each.js'), require('core-js/modules/esnext.iterator.constructor.js'), require('core-js/modules/esnext.iterator.for-each.js'), require('koa'), require('koa-router'), require('koa-bodyparser'), require('core-js/modules/esnext.async-iterator.reduce.js'), require('core-js/modules/esnext.iterator.reduce.js'), require('core-js/modules/esnext.async-iterator.map.js'), require('core-js/modules/esnext.iterator.map.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/esnext.async-iterator.for-each.js', 'core-js/modules/esnext.iterator.constructor.js', 'core-js/modules/esnext.iterator.for-each.js', 'koa', 'koa-router', 'koa-bodyparser', 'core-js/modules/esnext.async-iterator.reduce.js', 'core-js/modules/esnext.iterator.reduce.js', 'core-js/modules/esnext.async-iterator.map.js', 'core-js/modules/esnext.iterator.map.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, null, null, global.Koa, global.Router, global.bodyParser));
})(this, (function (esnext_asyncIterator_forEach_js, esnext_iterator_constructor_js, esnext_iterator_forEach_js, Koa, Router, bodyParser) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
  var Router__default = /*#__PURE__*/_interopDefaultLegacy(Router);
  var bodyParser__default = /*#__PURE__*/_interopDefaultLegacy(bodyParser);

  const RequestMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    OPTION: 'option',
    PATCH: 'patch'
  };
  const controllers = [];

  // 装饰器的本质，是对类的行为的改变，在代码编译时发生的，也不是运行时
  // 编译器执行的函数
  function Controller(prefix = '') {
    return function (target) {
      // 给 controller 添加路由的前缀
      console.log('给 controller 添加路由的前缀: ', target);
      target.prefix = prefix;
    };
  }
  function RequestMapping(method = '', url = '') {
    return function (target, name, descriptor) {
      // 如果没有定义 url, 就以函数名称作为借口
      let path = url || name;
      controllers.push({
        url: path,
        method: method,
        handler: target[name],
        constructor: target.constructor
      });
    };
  }

  const books = new Array(100).fill(0).map((item, index) => {
    return {
      id: index + 1,
      name: `书名${index + 1}`,
      desc: `简介${index + 1}`,
      author: `作者${index + 1}`,
      publish: `2023-12-28 ${index + 1}`
    };
  });

  var _dec, _dec2, _dec3, _class, _class2;
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let BookController = (_dec = Controller('/book'), _dec2 = RequestMapping(RequestMethod.GET, '/all'), _dec3 = RequestMapping(RequestMethod.GET, '/delete'), _dec(_class = (_class2 = class BookController {
    async getAllBooks(ctx, next) {
      ctx.body = {
        data: books
      };
    }
    async deleteBook(ctx, next) {
      ctx.body = {
        data: '删除book'
      };
    }
  }, (_applyDecoratedDescriptor(_class2.prototype, "getAllBooks", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllBooks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteBook", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteBook"), _class2.prototype)), _class2)) || _class);

  var index = {
    Book: BookController
  };

  const app = new Koa__default["default"]();
  const router = new Router__default["default"]();

  // cors
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, *');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    if (ctx.request.method.toLowerCase() === 'options') {
      ctx.state = 200;
    } else {
      await next();
    }
  });
  app.use(bodyParser__default["default"]());
  console.log('controllers: ', controllers);
  controllers.forEach(item => {
    let {
      url,
      method,
      handler,
      constructor
    } = item;
    const {
      prefix
    } = constructor;
    if (prefix) url = `${prefix}${url}`;
    console.log(url);
    router[method](url, handler);
  });
  app.use(router.routes());
  app.use(router.allowedMethods({}));
  app.listen(3000, () => {
    console.log('server is on 3000');
  });

}));
