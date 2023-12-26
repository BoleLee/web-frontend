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
