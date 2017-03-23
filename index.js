const promisify = (fn, context) => (...args) => new Promise((resolve, reject) => {
	args.push((err, data) => err ? reject(err) : resolve(data))
	fn.apply(context, args)
});

promisify.all = srcObj => new Proxy(srcObj, {
	get(target, key, context) {
		return promisify(target[key], target)
	}
})

module.exports = promisify
