import ForceSimulator from 'src/force-simulator'

describe('test force simulator', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should init force simulation', () => {
    const fs = new ForceSimulator()

    expect(fs.simulation).toHaveProperty('nodes')
    expect(fs.center).toHaveProperty('x')
    expect(fs.manyBodyForce).toHaveProperty('theta')
    expect(fs.linkForceCreator).toBeInstanceOf(Function)
    expect(fs.collideForce).toHaveProperty('radius')
    expect(fs.xForce).toHaveProperty('strength')
    expect(fs.yForce).toHaveProperty('strength')
  })

  it('should start force simulation', async () => {
    const fs = new ForceSimulator()

    fs.start()

    expect(fs.linkForce).toHaveProperty('id')
    expect(fs.nodes).toEqual([])
    expect(fs.links).toEqual([])
  })

  it('should stop force simulation', () => {
    const fs = new ForceSimulator()

    fs.simulation.stop = jest.fn()

    fs.stop()

    expect(fs.simulation.stop).toBeCalled()
  })

  it('should restart force simulation', () => {
    const fs = new ForceSimulator()

    fs.simulation.restart = jest.fn()

    fs.restart()

    expect(fs.simulation.restart).toBeCalled()
  })

  it('should reset force simulation options', () => {
    const fs = new ForceSimulator({
      center: {
        x: 0,
        y: 0
      }
    })
    fs.simulation.stop = jest.fn()
    fs.initSimulation = jest.fn()

    fs.reset({ center: { y: 1 } })

    expect(fs.simulation.stop).toBeCalled()
    expect(fs.initSimulation).toBeCalledWith({
      center: {
        x: 0,
        y: 1
      }
    })
  })

  it('should get force simulator options', () => {
    const options = { center: { x: 0, y: 0 } }
    const fs = new ForceSimulator(options)

    expect(fs.getOptions()).toEqual(options)
  })

  it('should listen force simulator', async () => {
    const fs = new ForceSimulator()
    const callback = jest.fn()

    await new Promise(resolve => {
      fs.on('tick', (...args) => {
        callback(...args)
        resolve()
      })

      fs.start()
    })

    expect(callback).toBeCalledWith([], [])
  })
})
