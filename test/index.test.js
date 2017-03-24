const {expect} = require('chai')
const prWrap = require('../index')

const cbModule = {
	value: 1,
	asyncWithContext(callback) {
		callback(null, this.value)
	},
	asyncNumber(number, callback) {
		setTimeout(() => {
			if (typeof number == 'number')
				callback(null, number)
			else
				callback(new Error('Not a Number'))
		}, 0)
	}
}

describe('Test single function', () => {
	it('fullfills promise', done => {
		prWrap(cbModule.asyncNumber)(5)
			.then(result => {
				expect(result).to.equal(5)
				done()
			})
			.catch(done)
	})

	it('rejects promise', done => {
		prWrap(cbModule.asyncNumber)(null)
			.then(done)
			.catch(err => {
				expect(err.message).to.equal('Not a Number')
				done()
			})
	})

	it('preserves context', done => {
		prWrap(cbModule.asyncWithContext, cbModule)()
			.then(result => {
				expect(result).to.equal(cbModule.value)
				done()
			})
			.catch(done)
	})
})

describe('Test proxy object', () => {
	const prModule = prWrap.all(cbModule)

	it('fullfills promise', done => {
		prModule.asyncNumber(5)
			.then(result => {
				expect(result).to.equal(5)
				done()
			})
			.catch(done)
	})

	it('rejects promise', done => {
		prModule.asyncNumber(null)
			.then(done)
			.catch(err => {
				expect(err.message).to.equal('Not a Number')
				done()
			})
	})

	it('preserves context', done => {
		prModule.asyncWithContext()
			.then(result => {
				expect(result).to.equal(cbModule.value)
				done()
			})
			.catch(done)
	})
})
