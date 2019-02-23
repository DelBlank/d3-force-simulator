# d3-force-simulator

基于 `d3-force` 构建的力图模拟器，用来计算力图中节点和边的位置信息。

## Install

```shell
$ npm i -S d3-force-simulator
```

## Usage

```js
import ForceSimulator from 'd3-force-simulator'

// 创建一个新力图模拟器
const simulator = new ForceSimulator({
    simulation = {...},
    center = {...},
    collide = {...},
    manyBody = {...},
    link = {...},
    position = {...}
})

// 节点
const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"}
]

// 边
const links = [
  {"source": 'Alice', "target": 'Bob'},
  {"source": 'Bob', "target": 'Carol'}
]

// 模拟器计算回调函数
const callback = (nodes, links) => console.log(nodes, links)

// 监听模拟器计算回调
simulator.on('tick', callback)

// 启动模拟器
simulator.start({nodes, links, callback})

// 暂停模拟器
simulator.stop()

// 重启模拟器
simulator.restart()

// 重置模拟器参数
simulator.reset({
  simulation = {...},
  center = {...},
  collide = {...},
  manyBody = {...},
  link = {...},
  position = {...}
})
```

## Constructor options

| name       | type   | default | required | description                                                                                                                                                                                                                                                                                                       |
| ---------- | ------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| simulation | object | {}      |          | 包括 [alpha](alphaMin)、[alphaMin](https://github.com/d3/d3-force#simulation_alphaMin)、[alphaDecay](https://github.com/d3/d3-force#simulation_alphaDecay)、[alphaTarget](https://github.com/d3/d3-force#simulation_alphaTarget) 和 [velocityDecay](https://github.com/d3/d3-force#simulation_velocityDecay) 参数 |
| center     | object | {}      |          | 包括 [x](https://github.com/d3/d3-force#center_x) 与 [y](https://github.com/d3/d3-force#center_y) 参数                                                                                                                                                                                                            |
| collide    | object | {}      |          | 包括 [radius](https://github.com/d3/d3-force#collide_radius)、[strength](https://github.com/d3/d3-force#collide_strength) 和 [iterations](https://github.com/d3/d3-force#collide_iterations) 参数                                                                                                                 |
| manyBody   | object | {}      |          | 包括 [strength](https://github.com/d3/d3-force#manyBody_strength)、[theta](https://github.com/d3/d3-force#manyBody_theta)、[distanceMin](https://github.com/d3/d3-force#manyBody_distanceMin) 和 [distanceMax](https://github.com/d3/d3-force#manyBody_distanceMax) 参数                                          |
| link       | object | {}      |          | 包括 [id](https://github.com/d3/d3-force#link_id)、[distance](https://github.com/d3/d3-force#link_distance)、[iterations](https://github.com/d3/d3-force#link_iterations) 和 [strength](https://github.com/d3/d3-force#link_strength) 参数                                                                        |
| position   | object | {}      |          | 包括 [x](https://github.com/d3/d3-force#x_x)、[y](https://github.com/d3/d3-force#y_y)、[xStrength](https://github.com/d3/d3-force#x_strength) 和 [yStrength](https://github.com/d3/d3-force#y_strength) 参数                                                                                                      |

## API

| name       | type                                                    | description                                                                                                                                                       |
| ---------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start      | function(nodes: object[], links: object[])              | 根据传入的 `nodes` 和 `links` 启动模拟器进行布局运算                                                                                                              |
| stop       | function()                                              | 停止当模拟器继续运行                                                                                                                                              |
| restart    | function()                                              | 重启模拟器                                                                                                                                                        |
| reset      | function(options: object)                               | 停止当前模拟器，根据新传入的参数构建一个新模拟器                                                                                                                  |
| on         | function(event: string, callback: (nodes, links) => {}) | 监听模拟器的 `tick` 和 `end` 事件，不同于 `d3-force` 底层的[监听方式](https://github.com/d3/d3-force#simulation_on)，回调函数会拿到最新的 `nodes` 和 `links` 数据 |
| getOptions | function():object                                       | 获取当前模拟器的参数                                                                                                                                              |
