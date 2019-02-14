/**
 * compose middleware
 *
 * @param {function array} middleware
 * @return {function} composed fn
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }
  for (let fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }

	return async function () {
    let args = arguments
    async function dispatch (i) {
      const fn = middleware[i]
      if (!fn) return Promise.resolve()

      try {
        return await fn(function next () {
          return dispatch(i + 1)
        }, ...args)
      }  catch (err) {
        return err
      }
    }
    return await dispatch(0)
  }
}

module.exports = compose