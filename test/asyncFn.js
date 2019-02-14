const assert = require('assert')
const compose = require('../src/index')

let ArrAsyncPush = function(arr, value){
  return new Promise(function(resolve, reject){
    setTimeout(() => {
      arr.push(value)
      resolve()
    }, 10)
  })
}

it('should handle with async function', (done) => {
  let array = []
  let middleware = []
  middleware[0] = async (next) => {
    await ArrAsyncPush(array, 1)
    await next()
    await ArrAsyncPush(array, 4)
  }
  middleware[1] = async (next) => {
    await next()
    await ArrAsyncPush(array, 3)
  }
  middleware[2] = async (next) => {
    await ArrAsyncPush(array, 2)
  }

  let fn = compose(middleware); // donot miss ;, it is a bug
  (async () => {
    await fn()
    assert.strictEqual(array[0], 1)
    assert.strictEqual(array[1], 2)
    assert.strictEqual(array[2], 3)
    assert.strictEqual(array[3], 4)
    assert.strictEqual(array.length, 4)
    done()
  })() 
})