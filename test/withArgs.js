const assert = require('assert')
const compose = require('../src/index')

it('should handle with args', () => {
  let array = []
  let middleware = []
  middleware[0] = (next, foo, bar, biu) => {
    array.push(foo)
    next()
  }
  middleware[1] = (next, foo, bar, biu) => {
    array.push(bar)
    next()
  }
  middleware[2] = (next, foo, bar, biu) => {
    array.push(biu)
    next()
  }

  let fn = compose(middleware); // donot miss ;, it is a bug
  fn('foo', 'bar', 'biu')
  
  assert.strictEqual(array[0], 'foo')
  assert.strictEqual(array[1], 'bar')
  assert.strictEqual(array[2], 'biu')
  assert.strictEqual(array.length, 3)
})