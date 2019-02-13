const assert = require('assert')
const compose = require('../index')

it('should excute like onion', () => {
  let result = []
  let middleware = []
  middleware[0] = (next) => {
    result.push(1)   // should excute first
    next()
    result.push(3)   // should excute third
  }
  middleware[1] =async (next) => {
    result.push(2)   // should excuted secend
  }
  middleware[2] = (next) => {
    result.push(-1)  // should not excuted
  }
  let fn = compose(middleware)
  fn()
  
  assert.strictEqual(result[0], 1)
  assert.strictEqual(result[1], 2)
  assert.strictEqual(result[2], 3)
  assert.strictEqual(result.length, 3)
})