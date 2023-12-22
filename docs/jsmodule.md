# JS 模块化

## 不得不说的历史

### 背景

JS本身定位：简单的页面设计 + 页面动画 + 基本的表单提交
并无模块化 or 命名空间的概念

> JS的模块化需求日益增长

### 幼年期：无模块化（委婉的辩解）

1. 开始需要在页面加载不同的js了：动画库、表单库、格式化工具
2. 多种js代码被分在不同文件中
3. 不同的文件又被同一模板引用

```js
// test.html
<script src="jquery.js"></script>
<script src="tools.js"></script>
<script src="main.js"></script>
```

认可：文件分离是最基础的模块化，第一步

追问：script标签两个参数 - async & defer

```js
<script src="jquery.js" type="text/javascript" async></script>
```

总结：parse - download - excute

- normal: 解析到标签，立刻pending, 并且下载且执行，**block主线程**
- defer: 解析到标签开始异步下载，继续解析完成后开始执行
- async: 解析到标签开始异步下载，下载完成之后立刻执行，并且**阻塞解析**，执行完成后，再继续解析

1. 兼容性 => IE9 + 兼容程度不同
2. 问题方向 => **浏览器渲染原理、同步异步原理（微任务、事件循环等）、模块化加载原理**

问题出现：污染全局作用域 => 不利于大型项目的开发及多人团队共建

### 成长期：模块化的雏形 - IIFE(语法侧的优化)

#### 作用域的把控

```js
// 全局变量
let count = 0
// 代码块1
const increase = () => ++count
// 代码块2
const reset = () => {
  count = 0
}

increase()
reset()
```

利用函数块级作用域:

```js
(() => {
  let count = 0
  // ...
})()
```

定义函数 + 立即执行 => 独立的空间，初步实现了一个最最最最最基础的模块化

尝试定义一个最简单的模块 - 模块 and 外部（解决全局污染问题）

```js
// iifemodule
const module = (() => {
  let count = 0
  return {
    increase: () => ++count,
    reset: () => {
      conut = 0
    }
  }
})()

module.increase()
module.reset()
```

> 追问：有额外依赖的时候，如何优化处理IIFE
优化1: 依赖其他的IIFE => 给匿名函数传参

```js
const iifeModule = ((dependencyModule1, dependencyModule2) => {
  let count = 0
  // 使用dependencyModule
  return {
    increase: () => ++count,
    reset: () => {
      conut = 0
    }
  }
})(dependencyModule1, dependencyModule2)
```

> 追问2: 了解早期jQuery依赖处理/模块加载的方案么？or 了解传统IIFE是如何解决多方依赖的问题么？

优化：IIFE + 传参调配

实际上，传统框架应用了一种revealing的写法，**揭示模式**

```js
const iifeModule = ((dependencyModule1, dependencyModule2) => {
  let count = 0
  
  const increase = () => ++count
  const reset = (val) => {
    console.log(val)
    conut = 0
    // 使用dependencyModule
  }
  return {
    increase,
    reset
  }
})(dependencyModule1, dependencyModule2)

iifeModule.increase()
iifeModule.reset('aa')

// 返回的是能力 = 使用方法传参 + 本身逻辑能力 + 依赖能力
// 如jQuery: $('').attr('title', '标题')
```

追问：面试中后续引导的方向：

1. 深入模块化实现
2. 转向框架：jQuery, vue, react的**模块化实现的细节，以及框架特征原理**
3. 转向设计模式 - **注重模块化的设计模式**

### 成熟期

#### CJS - Commonjs

> node.js制定的标准
特征：

- 通过 module + export 去对外暴露接口
- 通过 require 去调用其他模块

模块组织方式
main.js

```js
const dependencyModule1 = require('./dependencyModule1')
const dependencyModule2 = require('./dependencyModule2')

// 核心逻辑
let count = 0
const increase = () => ++count
const reset = val => {
  count = 0
  // dependencyModule
}

// 暴露接口部分
export.increase = increase
export.reset = reset

module.exports = {
  increase,
  reset
}
```

```js
const { increase, reset } = require('dep.js')

increase()
reset()
```

可能会被问到的问题: **实际执行处理**

```js
(function (thisValue, exports, module){
  const dependencyModule1 = require('./dependencyModule1')
  const dependencyModule2 = require('./dependencyModule2')

  // 业务逻辑
}).call(thisValue, exports, require, module)

// 部分开源项目分别传入全局、指针、框架做参数
(function(window, $, undefined) {

})(window, jQuery)
// window - 1. 全局作用域改成了局部作用域，执行的时候不用全局调用，提升效率（使用时判定参数可用性，不必再判定值是否为想要的）
// 2.编译时候优化压缩(编译后：function(c){}(window), window 被压缩为 c)
// jQuery - 1. 独立进行改动挂载，保障稳定 （内部使用时对其做了调整修改的情况下，只要保障传入的为要求的版本即可）
// 2. 防止全局污染
// undifined - 1. 防止重写（部分框架会对undefined重写）
```

> 优点：
CJS从服务端角度，解决了依赖、全局污染的问题

> 缺憾：
针对服务端（CJS只能在nodejs环境使用，浏览器不支持）

新的问题 - 异步依赖

#### AMD

> 通过异步加载 - 允许定制回调函数

经典实现框架：require.js

新增定义方式：

```js
// 通过define来定义一个模块，然后用require去加载
define(id, [depends], callback)
require([module], callback)
```

```js
defined('amdModule', ['dependencyModule1', 'dependencyModule2'], (dependencyModule1, dependencyModule2) => {
  // 业务逻辑
  let count = 0
  const increase = () => ++count
  const reset = (val) => {
    count = 0
    // dependencyModule
  }
})
```

```js
require(['amdModule'], amdModule => {
  amdModule.increase()
})
```

** 面试题：如何对已有代码做兼容(将上述CJS写的自增改造为AMD方式)

1. 增加定义阶段
2. 返回作为回调函数内部的return

> TODO 回顾总结：曾在业务中遇到的bimface使用问题，three.js依赖未加载完的问题

```js
defined('amdModule', [], () => {
  const dependencyModule1 = require('./dependencyModule1')
  const dependencyModule2 = require('./dependencyModule2')

  // 核心逻辑
  let count = 0
  const increase = () => ++count
  const reset = val => {
    count = 0
    // dependencyModule
  }

  // 暴露接口部分
  export.increase = increase
  export.reset = reset

  return {
    increase,
    reset
  }
})
```

面试题3: **兼容判断 AMD & CJS**

UMD的出现

```js
defined('amdModule', [], () => {
  const dependencyModule1 = require('./dependencyModule1')
  const dependencyModule2 = require('./dependencyModule2')

  // 核心逻辑
  let count = 0
  const increase = () => ++count
  const reset = val => {
    count = 0
    // dependencyModule
  }

  // 暴露接口部分
  export.increase = increase
  export.reset = reset

  return {
    increase,
    reset
  }
})(
  // 目标：一次性区分CJS和AMD
  // 1. CJS factory
  // 2. module module.exports
  // 3. define
  typeof module === 'Object'
  && module.exports
  && typeof define !== 'function'
    ? // 是CJS
    factory => module.exports => factory(require, exports, module)
    : // 是AMD
    define 
)
```

> 优点：解决了浏览器的异步动态依赖
缺点：会有引入成本，没有考虑按需加载

### CMD规范

> 按需加载
主要应用框架 sea.js

```js
// 依赖就近
define('module', (require, exports, module) => {
  let $ = require('jquery)
  // ---
  let depends1 = require('./dependencyModule)
})
```

> 优点：依赖就近，按需加载
缺憾：1.依赖于打包 2.扩大了模块内的体积

CMD区别于AMD：**按需加载，依赖就近**

### ESM - ESModule

> 走进新时代

新增定义：

- 引入关键字 - import
- 导出关键字 - export

```js
// 引入区域
import dependencyModule1 from '/dependencyModule.js'

// 业务核心逻辑
// ...

// 暴露接口
export default {
  increase,
  reset
}
```

**追问：ESM动态模块**

考察：export promise

ES11原生解决方案

```js
import('./esModule.js').then(dynamicEsModule => {
  dynamicEsModule.increase()
})
```

> 优点
通过一种统一的形态整合了所有js模块化

## 知识体系小结

js - 模块化 - 工程化

传统：无模块化、CJS、AMD、CMD

- 无模块化 => 匿名函数定义 + 执行 => IIFE依赖传入
- CJS - Commonjs 引入require,module,exports定义，解决依赖、全局污染问题
- AMD - require.js 引入define定义，支持了异步依赖
- UMD - 判断是CJS还是AMD，解决浏览器异步动态依赖
- CMD - sea.js 按需加载，就近依赖
- ESM - 浏览器原生支持，统一了模块化的定义标准

现代型：拓扑组合

### 问题

- 循环引用问题

工程化解决方案 webpack 拓扑组合

  a) common, commonComponents
  b) treeShaking 按需引入

工程化前的方案：模块拆分，独立空间区分。无论是IIFE传参调配，还是CMD按需引入就近依赖，都是把**全局依赖 -> 局部依赖**，他们都没有解决依赖越多，文件越大，解决方案：**区分公用模块，私有模块**，即工程化雏形。

- 深入理解：webpack打包完后，与打包前对比
- co.js
