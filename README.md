
## react-global-shared

react全局状态管理,更自由,更简单.

[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
![Travis (.org)](https://travis-ci.org/meihuanyu/react-global-shared.svg?branch=master)

## ✨ Features

- 全局状态管理,兼容hooks
- 可以再非组件中操作状全局状态

## 简介
修改objectState中state,调用的地方会重新render
hooks: useGlobalState
普通组件: connect
```
// 直接返回state
useGlobalState(objeact: objectState): state

//  注入state到Component
connect(Component: React.ComponentType, ...objectState):React.ComponentType

```

objectState

* name 必填值 用于注入普通组件中
* state 必填值 用于初始化值
* [key as string]: () => 在方法中直接修改state值即可
### Installing

```
yarn add react-global-shared
```

## Running the tests
```
yarn run test
```
## Usage
olny tow api
```
import { connect, useGlobalState } from 'react-global-shared
```

## Quick Start

state
```
// userState.js
export const userState = {
    name: "user",
    state: { email: "init@exapmle.com" },
    changeEmail: function(){
        this.state = { email: "hh@exapmle.com"}
    }
}
```

commonly exapmle
```
// App.js
import React from 'react'
import { connect } from 'react-global-shared
import { userState } from './userState'
class App extends React.Component{
    render(){
        const user = this.props.user
        return <div>
                    <span>{user.email}</span>
                    <button onClick={userState.changeEmail}> change email</button>
                </div>
    }
}
export default connect(App, userState)

```

hooks exapmle
```
// App.js
import React from 'react'
import { useGlobalState } from 'react-global-shared'
import { userState } from './userState'

export default () => {
    const user = useGlobalState(userState)
    return <div>
                <span>{user.email}</span>
                <button onClick={userState.changeEmail}> change email</button>
            </div>
}
```

// 任意function 可直接调用
```
// util.js
import { userState } from './userState'
const change = (email) => {
    userState.changeEmail(email)
    return email
}

```

## FAQ

* 修改了state,没有render？

## Built With

* [immutability-helper](https://github.com/kolodny/immutability-helper) - Mutate a copy of data without changing the original source


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* girl friend give strong backing
