import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/force-simulator.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: ['url', 'assert', 'http', 'https', 'zlib', 'stream', 'util', 'tty'],
  plugins: [
    // 查找 node_modules 模块路径
    resolve({
      // 不需要内置模块
      preferBuiltins: false,
      // 读取 package.json 的 browser 字段，相当于设置环境为 browser
      browser: true
    }),
    // 解析 commonjs node_modules 模块
    commonjs({
      include: ['node_modules/**']
    }),
    // 解析 json 格式，转换为 es6 版本
    json(),
    // babel 转义
    babel({
      exclude: ['node_modules/**'],
      plugins: ['external-helpers']
    }),
    filesize()
  ]
}
