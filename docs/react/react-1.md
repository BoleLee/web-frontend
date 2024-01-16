# React 基础

## React 介绍

React 是一个声明式、高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂 UI 界面，这些代码片段片段被称为“组件”。

React: UI = render(data) **单向数据流**，不能通过双向绑定实现响应式

Vue: 类 MVVM，通过 ref 可真实获取DOM，不是通过view model

Q：vue, react 属于哪种框架？ MVC, MVVM, ...

## JSX 模板语言

JSX: JS extend 目的是将 UI 与逻辑层耦合起来，在组件中使用，语法：`{}`, 使用小驼峰来定义属性。

```js
<div class="" table-index></div>

<div className="" tableIndex>
```

### JSX支持表达式

```jsx
// jsx支持变量
const name = 'grace'
const ele = <h1>hello, {name}<h1>

// jsx支持方法展示
function formatName (user) {
  return user.firstName + ' ' + user.lastName
}
const user = {
  firstName: 'grace',
  lastName: 'lee'
}

const ele1 = <h1>hello, {formatName(user)}<h1>

// jsx作为函数的返回
function getGreeting (user) {
  if (user) {
    return <h1>hello, {formatName(user)}</h1>
  }
  return <h1>hello, stranger</h1>
}

const ele2 = {getGreeting()}
```

### JSX支持指定属性

```js
const ele = <img src={useravatarUrl} />
```

Q2: React 如何预防XSS攻击

Cross Site Script 恶意脚本注入

- 反射型xss

```jsx
http://xxx.com/search?query=123
// 服务器返回用户的输入
<p>搜索结果：123</p>

http://xxx.com/search?query=<img src="error.png" onError="alert('XSS')" />
<p>搜索结果：<img src="error.png" onError="alert('XSS')" /></p>
```

- 存储型xss

```jsx
<textarea><img src="error.png" onError="alert('XSS')" /></p></textarea>
```

将用户输入做转义。

34 " &quot;
38 & &amp;
39 ' &#x27;
60 < &lt;
62 > &gt;

```jsx
// React.createElement()
const element = (
    <h1 className="greet">
      hello world
    </h1>
)
```
