/**
 * @param middleware
 *   参数是个函数数组，约定每一个函数的第一个参数都是next函数
 *   compose函数的每个参数都会交给middleware的函数
 *
 * @return {function(): (Promise<void>|*|*)}
 */
function compose (middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware must be an array!')
    }
    for (let fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('The element of middleware must be a function!')
        }
    }

    return async function () {
        let args = arguments

        async function dispatch (i) {
            const fn = middleware[i]

            // i会一直递增，直到数组越界，所以这个是递归的终止条件
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
