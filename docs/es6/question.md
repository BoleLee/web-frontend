### 函数解析

#### new一个箭头函数，会如何?

- 会报错，提示 'xxx in not a constructor'
- babel编译时，会把 this 转换成 (void 0)

```js
const TestArrayFunc = () => {
  this.age = 18
  this.name = 'grace'
}

// 报错：TestArrayFunc is not a constructor
new TestArrayFunc()
```

#### 哪些场景不能用箭头函数？

- arguments
- yield
- 构造函数的原型方法
- Vue的watch

### Proxy

#### 如何实现一个断言函数?

```js
const assert = new Proxy({}, {
  get: function (target, propKey, receiver) {
    // console.log(target, propKey, receiver)
    return Reflect.get(target, propKey, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log(target, propKey, value, receiver)
    if (!value) {
      console.error(propKey)
    }
    return Reflect.set(target, propKey, receiver)
  }
})

// 没懂，assert是一个Proxy, 并不是函数，
// 上述处理只是当propValue为false时，输出对应的propKey，比如 assert['key'] = false 输出：key
// 利用值做判断，key做错误信息提示？来实现断言？
const teacher = 'grace'
assert['the teacher is grace !!!'] = (teacher === 'jack')
```

### Map, Set

#### 实现一个成员函数，并且get无法调用

```js
// 没懂 WeakSet
const foos = new WeakSet()
class Foo {
  constructor () {
    foos.add(this)
  }

  method () {
    if (!foos.has(this)) {
      throw new TypeError('method 只能在Foo实例上使用')
    } else {
      console.log('using method')
    }
  }
}

const f = new Foo()
f.method()
```
