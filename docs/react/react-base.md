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
// alert('XSS') 被执行
```

- 存储型xss

```jsx
<textarea><img src="error.png" onError="alert('XSS')" /></p></textarea>
```

应对方法（react源码）：将用户输入的特殊字符做转义，避免其可运行。

34 " &quot;
38 & &amp;
39 ' &#x27;
60 < &lt;
62 > &gt;

### JSX支持对象 - Symbol 标识react element

```jsx
const element = (
  <h1 className="greet">
    hello world
  </h1>
)

// babel 转译后
// React.createElement()
import { jsx as _jsx } from "react/jsx-runtime";
const element = /*#__PURE__*/_jsx("h1", {
  className: "greet",
  children: "hello world"
});

// 最终渲染的 - jsx支持对象
const element = {
  $$typeof: Symbol('react.element'), // 用来标识是否是一个真实的react element
  type: 'h1',
  key: null,
  props: {
    lassName: "greet",
    children: "hello world"
  }
}

// 伪装react element是否可行
const storeData = `{
  "ref": null,
  "type": "body",
  "props": {
    "dangerouslySetInnerHTML": {
      "__html": "<img src=\"error.png\" onError=\"alert('XSS')\" />"
    }
  }
}`
// JSON 序列化后，Symbol会丢失
const parsedData = JSON.parse(storeData)
render() {
  return <span>{parsedData}</span>
}
```

### JSX 渲染成 DOM

```js
const element = <h1>Hello World</h1>

ReactDOM.render(element, document.getElementById('root'))
// 结果
<div id="root">
  <h1>Hello World</h1>
</div>

// render 只能标识当前时刻的状态，当前element是什么，就渲染的是什么
// 那么，如何增量渲染？不可能每次dom变动，就执行一次render
```

**如何增量渲染？不可能每次dom变动，就执行一次render**

## props 和 state

### 组件

```jsx
// 函数式组件
function Welcome (props) {
  return <h1>Hello {props.name}</h1>
}

// Class类组件
Class Welcome extends React.Component {
  render () {
    return <h1>Hello {this.props.name}</h1>
  }
}

const element = <Welcome name="Grace" />
ReactDOM.render(element, document.getElementById('root'))
```

#### 自定义组件要大写字母开头

```js
// 正确！组件命名需要以大写字母开头
function Hello(props) {
  // 正确！这种 <div></div> 的使用合法，因为div是一个有效的HTML标签
  return <div>Hello, {props.name}</div>
}

function HelloGrace () {
  // 正确！React 知道 <Hello /> 是一个组件，因为它是大写字母开头
  return <Hello name="Grace" />
}
```

### 组件的组合与拆分

页面多次引用

```jsx
<div>
  <Welcome name="Jack" />
  <Welcome name="Maggie" />
  <Welcome name="Emma" />
</div>
```

Q: 3个组件，它们的真实内存地址是同一个吗？
A: 否，每生成一个组件，相当于新实例化一个函数/类，会新分配内存空间

```jsx
function Comment (props) {
  return (
    <div className="Comment">
      <div class="userInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Connment-text">{props.text}</div>
      <div className="Commnet-date">
        {formatDate(props.date)}
      </div>
    </div>
  )
}

// 拆分
function Comment (props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Connment-text">{props.text}</div>
      <div className="Commnet-date">
        {formatDate(props.date)}
      </div>
    </div>
  )
}
function UserInfo (props) {
  return (
    <div class="userInfo">
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}
```

### 受控组件 和 非受控组件

受控组件： 组件内的值是否由用户设置，而非代码设置。
非受控组件：组件内部状态，不能由用户控制

```jsx
// 非受控组件，input自身维护状态，外界无法获取数据
class TextConponent extends React.Component {
  render () {
    return <input name="username">
  }
}
```

```jsx
// 可以设置初始值
// 受控组件
class TextConponent extends React.Component {
  constructor (props) {
    supre(props)
    this.state = { 'username': 'test' }
  }
  render () {
    return <input name="username" value={this.state.username}>
  }
}
```

```jsx
// 可以读取并设置初始值
// 跟非受控组件相同功能的受控组件
class TextConponent extends React.Component {
  constructor (props) {
    supre(props)
    this.state = { 'username': 'test' }
  }
  obChange (e) {
    console.log(e.target.value)
    this.setState({
      username: e.target.value
    })
  }
  render () {
    return <input name="username" value={this.state.username} onChange={(e) => this.onChange(e)}>
  }
}
```

### props 和 state的关系

props: 外部传入，保证其不会改变，需要改变转为 state

如何增量渲染？不可能每次dom变动，就执行一次render

```jsx
class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    this.timerID = setInterval(() => this.tick, 1000)
  }

  componnetWillUnmount () {
    clearInterval(this.timerID)
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  render () {
    return (
      <div>
        <h1>Hello World</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```
