import merge from 'lodash.merge'
import {
  forceX,
  forceY,
  forceCenter,
  forceLink,
  forceManyBody,
  forceCollide,
  forceSimulation
} from 'd3-force'

export default class ForceSimulator {
  constructor(options = {}) {
    this.options = options
    this.initSimulation(options)
  }

  // 初始化力学模拟器参数
  initSimulation({
    simulation = {},
    center = {},
    collide = {},
    manyBody = {},
    link = {},
    position = {}
  } = {}) {
    this.setForceSimulation(simulation)
    this.setCenter(center)
    this.setCollideForce(collide)
    this.setManyBodyForce(manyBody)
    this.setPositionForce(position)

    this.linkForceCreator = this.setLinkForce(link)
  }

  // 启动力学模拟器
  start = (nodes = [], links = []) => {
    this.nodes = nodes
    this.links = links
    this.linkForceCreator(links)

    this.simulation
      .nodes(nodes)
      .force('link', this.linkForce)
      .force('charge', this.manyBodyForce)
      .force('center', this.center)
      .force('collide', this.collideForce)
      .force('x', this.xForce)
      .force('y', this.yForce)
  }

  // 停止力学模拟器运行
  stop = () => this.simulation.stop()

  // 重启力学模拟器
  restart = () => this.simulation.restart()

  // 重置力学参数
  reset = options => {
    this.stop()

    this.options = merge(this.options, options)

    this.initSimulation(this.options)
  }

  // 监听计算回调
  on(event = 'tick', callback = () => {}) {
    this.simulation.on(event, () => callback(this.nodes, this.links))
  }

  // 获取当前力学参数
  getOptions() {
    return this.options
  }

  // 设置模拟器全局参数
  setForceSimulation({
    alpha = 1, // 初始阻尼系数
    alphaMin = 0.001, // 最小阻尼系数
    alphaDecay = 0.0228, // 阻尼衰减系数
    alphaTarget = 0, // 目标阻尼系数
    velocityDecay = 0.4 // 速度衰减系数
  } = {}) {
    this.simulation = forceSimulation()
      .alpha(alpha)
      .alphaMin(alphaMin)
      .alphaDecay(alphaDecay)
      .alphaTarget(alphaTarget)
      .velocityDecay(velocityDecay)
  }

  // 设置布局中心
  setCenter({ x = 0, y = 0 } = {}) {
    this.center = forceCenter(x, y)
  }

  // 设置节点的引力或者斥力
  setManyBodyForce({
    strength = -30, // 负数为斥力，整数位引力
    theta = 0.9, // Barnes-Hut 估算算法参数
    distanceMin = 1, // 节点间产生作用力的最小距离
    distanceMax = Infinity // 节点间产生作用力的最大距离
  } = {}) {
    this.manyBodyForce = forceManyBody()
    this.manyBodyForce.strength(strength)
    this.manyBodyForce.theta(theta)
    this.manyBodyForce.distanceMin(distanceMin)
    this.manyBodyForce.distanceMax(distanceMax)
  }

  // 设置牵引力
  setLinkForce({
    id = 'id', // 计算节点标识字段
    distance = 30, // 弹簧的初始长度
    iterations = 1, // 迭代次数
    strength // 弹簧的弹力系数
  } = {}) {
    return (links = []) => {
      this.linkForce = forceLink(links)
        .id(node => node[id])
        .distance(distance)
        .iterations(iterations)
        .strength(strength)
    }
  }

  // 设置碰撞力
  setCollideForce({
    radius = 1, // 节点碰撞力有效半径
    strength = 0.7, // 碰撞力系数 [0,1]
    iterations = 1 // 迭代次数
  } = {}) {
    this.collideForce = forceCollide()
      .radius(radius)
      .strength(strength)
      .iterations(iterations)
  }

  // 设置重力
  setPositionForce({
    x = 0, // 重力中心 x 坐标
    y = 0, // 重力中心 y 坐标
    xStrength = 0.1, // x 轴方向重力系数
    yStrength = 0.1 // y 轴方向重力系数
  } = {}) {
    this.xForce = forceX(x).strength(xStrength)
    this.yForce = forceY(y).strength(yStrength)
  }
}
