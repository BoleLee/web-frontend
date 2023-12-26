# es6

## 目标

- 了解 ES6 的 scope
- 了解 ES6 的常见面试题

## ECMAScript发展简介

- 1995.12 ...
- ...
- 2009.12 - ECMAScript 5
- 2015 - ECMAScript 6, ES6，也叫 ES2015
- 后续以年份更新...

重点：

- ECMAScript 是标准，JavaScript 是实现
  - Commonjs 是标准，nodejs 是实现
  - AMD 规范是标准，require.js 是实现
  - CMD 规范是标准，sea.js 是实现
- JavaScript最早，知识浏览器的一个脚本，用于实现HTML的动态效果
- 语言不是万能的，语言不是银弹，为什么会有这么多难记忆的东西？new ...
  - const p = new Person()
  - p.__proto__ === Person.protytype
  - Person.prototype.constructor = Person
  - p.constructor = Person

## 为什么会有 babel？

Es6 to 5

- 浏览器对于一些语言特性的实现，是滞后的
- 浏览器在用户侧的升级，是滞后的

### 主要用途

#### 转译 esnext, typescript, flow 等到目标环境支持的 JavaScript

#### 一些特定用途代码的转换

taro, react, vue

(那其实可以理解成这些框架定义了更上一层的标准，更贴合具体场景开发需要，而同es新特性一样，需要babel转化为浏览器可执行的代码)

#### 代码的静态分析

how?

### babel的解析流程

- parser
- transform
- generate

### babel 6

插件

- es 的发布
  - stage 0: strawan 只是一个想法
  - stage 1: proposol 值得继续的提议
  - stage 2: draft
  - stage 3: candidate
  - stage 4: finished

插件命名规则的发展
babel-preset-stage-2
babel-preset-2016

### babel 7

@babel/perset-env
  target

- [babel中文网](https://www.babeljs.cn/docs/)
- [babel英文网](https://babeljs.io/docs/)

## ES特性

### 函数解析

#### 参数 arguments / callee / caller 的区别？

- arguments 代表正在执行的函数的参数
- 使用 arguments.callee 获取，表示正在执行的函数
- caller 代表这个函数在被哪个函数调用? 试了下，函数打出来是null(Person.caller), 构造函数的实例打出来是undefined(p.caller)

```js
const Person = function (age, name) {
  this.age = age
  this.name = name

  console.log(arguments)
  for (let key in arguments) {
    console.log(key)
    console.log(arguments[key])
  }
}

const p = new Person(18, 'grace')

console.log(Person.caller)
console.log(p.caller)
```

```js
// 1, 1, 2, 3, 5, 8, 13, 21
// f(1) = 1, f(2) = 1, f(3) = f(1) + f(2), ... f(n) = f(n-1) + f(n-2)

// 递归输出第n个数
const fibonacci = function (num) {
  if (num <= 2) return 1
  // return fibonacci(num - 1) + fibonacci(num - 2)
  return arguments.callee(num - 1) + arguments.callee(num - 2)
}

console.log(fibonacci(7))

console.log(fibonacci.caller)
```

### 模板字符串

### 数组、对象的拓展与解构

数组的细节

快速生成数组：new Array(num).fill(0)

```js
// 函数生成器
const funcGenerator = (num) => new Array(num).fill(0).map((item) => (params) => console.log(params))
funcGenerator(10).map((func, index) => func(index))
```

对象的细节

#### object.is

采用了一个叫做 SameValueZero 的函数，这个是引擎内置的比较方式，没有对外的接口，最直接的收益，就是可以判断 NaN

```js
console.log(+0 === -0) // true
console.log(NaN === NaN) // false

console.log(Object.is(-0, +0)) // false
console.log(Object.is(NaN, NaN)) // true

console.log([NaN].includes(NaN)) // true SameValueZero
console.log([NaN].indexOf(NaN)) // -1 no SameValueZero
```

#### object.assign

只是对第一层，进行深拷贝，往下的属性，则存的是指针，对其进行修改，也会影响原值

### Proxy / reflect / map / set /symbol

#### Vue3 Proxy

- proxy, 天生的代理模式
- Reflect
  - 将Object的一些明显属于语言内部的方法，放在 Reflect 上
  - 修改了某些 Object 的返回结果，让其变得更合理
    - Object.defineProperty 无法定义时，throw Error
    - Reflect.defineProperty 无法定义时，返回false

```js
let grace = {
  name: 'grace',
  age: 18
}

const graceProxy = new Proxy(grace, {
  get: function (target, propKey, receiver) {
    // console.log(target, propKey, receiver)
    return Reflect.get(target, propKey, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log(target, propKey, value, receiver)
    return Reflect.set(target, propKey, receiver)
  }
})

graceProxy.name = 'jack'
```

#### map, set, weakMap, weakSet 的区别

- Map是一个 hash 结构，Set 是一个数组结构
- Weak 都是弱引用
  - GC 不考虑
  - key 都是对象

#### Symbol

独一无二属性名

```js
let s1 = Symbol('bar')
let s2 = Symbol('bar')
console.log(s1 === s2, s1.toString(), s2.toString())
console.log(s1, s2)
```

### 迭代器 Iterator

它是一种接口，为各种不同的数据结构，提供统一的访问机制。任何数据结构只有部署了`Iterator`, 都可以完成遍历操作。

- 为各种数据结构，提供一个统一、简单的访问接口
- 使数据结构的成员，按照某种次序排列
- 接口主要供`for ... of` 消费
- 本质就是**指针**

原生具备这些接口的数据结构有哪些？

- Array
- Map
- Set
- String
- TypedArray ?
- arguments
- Nodelist ?

一个对象如果要具备可被`for...of`循环调用的 `Iterator` 接口，就必须在 `Symbol.iterator` 的属性上部署遍历器生成方法

```js
let arr = [1,2,3,4]
let k = arr[Symbol.iterator]()
// [Function: values]
console.log(arr[Symbol.iterator])
// Object [Array Iterator] {}
console.log(arr[Symbol.iterator]())

console.log(k.next())
```

## 写一个后台

[ES实战](./es-shizhan.md)

## 补充

- insert-css
- enotion
