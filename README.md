# fn-compose
[![](https://badge.juejin.im/entry/5c6582f9e51d457fcc5abbef/likes.svg?style=flat-square)](https://juejin.im/post/5c657b6f6fb9a049e702a044)
compose functions to one which will be excuted like onion.
re-factor from koajs/compose so that you can custom args.

``` bash
$ npm i fn-onion
```
``` js
const compose = require('fn-onion')

let middleware = []
middleware[0] = async (next) => {
  await console.log(1)
  await next()
  await console.log(4)
}
middleware[1] = async (next) => {
  await next()
  await console.log(3)
}
middleware[2] = async (next) => {
  await console.log(2)
}

let fn = compose(middleware)
fn()
// 1 2 3 4
```
