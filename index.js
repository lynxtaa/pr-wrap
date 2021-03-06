const promisify = (fn, context) => (...args) => new Promise((resolve, reject) => {
	args.push((err, data) => err ? reject(err) : resolve(data))
	fn.apply(context, args)
})

promisify.all = srcObj => new Proxy(srcObj, {
	get(target, key) {
		return promisify(target[key], target)
	}
})

try {
	new Proxy({}, {})
} catch (e) {
	promisify.all = () => {
		throw new Error('ES6 Proxy is not supported')
	}
}

module.exports = promisify
