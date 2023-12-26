// const TestArrayFunc = () => {
//   this.age = 18
//   this.name = 'grace'
// }

// // 报错：TestArrayFunc is not a constructor
// new TestArrayFunc()

// const Person = function (age, name, ...rest) {
//   this.age = age
//   this.name = name

//   console.log(arguments)
//   for (let key in arguments) {
//     console.log(key)
//     console.log(arguments[key])
//   }

//   console.log(rest)

//   // console.log(callee)
// }

// const p  = new Person(18, 'grace', 'female', 'engineer')

// console.log(p.name)

// console.log(Person.caller)
// console.log(p.caller)

// 如何拿到所有参数？
// - arguments
// - rest

// 1, 1, 2, 3, 5, 8, 13, 21
// f(1) = 1, f(2) = 1, f(3) = f(1) + f(2), ... f(n) = f(n-1) + f(n-2)

// 递归输出第n个数
// const fibonacci = function (num) {
//   if (num <= 2) return 1
//   // return fibonacci(num - 1) + fibonacci(num - 2)
//   return arguments.callee(num - 1) + arguments.callee(num - 2)
// }

// console.log(fibonacci(7))

// console.log(fibonacci.caller)


// const obj1 = { name1: 'grace' }
// const obj2 = { fullname: { first: 'grace', second: 'lee' } }
// const obj3 = { name3: 'jack' }

// const res = Object.assign(obj1, obj2, obj3)

// // obj1.name1 = 'emma'
// // console.log(res)

// // obj2.fullname.second = 'lau'
// // console.log(res)

// res.name3 = 'jackee'
// console.log(obj3)

// res.fullname.second = 'lin'
// console.log(obj2)

// const funcGenerator = (num) => new Array(num).fill(0).map((item) => (params) => console.log(params))
// funcGenerator(10).map((func, index) => func(index))

// console.log(+0 === -0)
// console.log(NaN === NaN)

// console.log(Object.is(-0, +0))
// console.log(Object.is(NaN, NaN))

// console.log([NaN].includes(NaN))
// console.log([NaN].indexOf(NaN))

// let grace = {
//   name: 'grace',
//   age: 18
// }

// const graceProxy = new Proxy(grace, {
//   get: function (target, propKey, receiver) {
//     // console.log(target, propKey, receiver)
//     return Reflect.get(target, propKey, receiver)
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(target, propKey, value, receiver)
//     return Reflect.set(target, propKey, receiver)
//   }
// })

// console.log(graceProxy.age)

// graceProxy.name = 'jack'

// console.log(graceProxy.name)

// 如何实现一个断言函数?
// const teacher = 'grace'
// assert['the teacher is grace !!!'] = (teacher = 'jack')

// const assert = new Proxy({}, {
//     get: function (target, propKey, receiver) {
//       // console.log(target, propKey, receiver)
//       return Reflect.get(target, propKey, receiver)
//     },
//     set: function (target, propKey, value, receiver) {
//       console.log(target, propKey, value, receiver)
//       if (!value) {
//         console.error(propKey)
//       }
//       return Reflect.set(target, propKey, receiver)
//     }
//   })

// const teacher = 'grace'
// assert['the teacher is grace !!!'] = (teacher === 'jack')

// assert['key'] = false

// const foos = new WeakSet()
// class Foo {
//   constructor () {
//     foos.add(this)
//   }

//   method () {
//     if (!foos.has(this)) {
//       throw new TypeError('method 只能在Foo实例上使用')
//     } else {
//       console.log('using method')
//     }
//   }
// }

// const f = new Foo()

// f.method()

// let s1 = Symbol('bar')
// let s2 = Symbol('bar')
// console.log(s1 === s2, s1.toString(), s2.toString())
// console.log(s1, s2)

let m = new Map()
m.set('a', 'foo')
m.set('b', 'bar')
m.set('c', 'baz')
let arr = [1,2,3,4]

// let k = m.keys()
let v = m.values()
let e = m.entries()
let k = arr[Symbol.iterator]()
console.log(k.next())
console.log(k.next())
console.log(k.next())
console.log(k.next())
console.log(v.next())
console.log(v.next())
console.log(v.next())
console.log(v.next())
console.log(e.next())
console.log(e.next())
console.log(e.next())
console.log(e.next())
// [Function: values]
console.log(arr[Symbol.iterator])
// Object [Array Iterator] {}
console.log(arr[Symbol.iterator]())


