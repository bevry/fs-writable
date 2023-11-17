// external
import { equal, deepEqual } from 'assert-helpers'
import kava from 'kava'

// local
import writable, { isWritable } from './index.js'

const file = 'README.md'
const dir = '.'

kava.suite('@bevry/fs-writable', function (suite, test) {
	test('boolean works as expected', function (done) {
		;(async function () {
			equal(await isWritable(file), true, 'file is writable')
			equal(await isWritable(dir), true, 'dir is writable')
			equal(await isWritable('missing'), false, 'missing file is not writable')
			deepEqual(
				await isWritable([file, dir, 'missing']),
				[true, true, false],
				'writable combination is as expected'
			)
		})()
			.then(() => done())
			.catch((err: any) => done(err))
	})
	test('throw works as expected (part 1)', function (done) {
		;(async function () {
			await writable(file)
			await writable(dir)
			await writable([file, dir])
		})()
			.then(() => done())
			.catch((err: any) => done(err))
	})
	test('throw works as expected (part 2)', function (done) {
		;(async function () {
			await writable('missing')
		})()
			.then(() => done(new Error('failed to fail')))
			.catch(() => done())
	})
})
