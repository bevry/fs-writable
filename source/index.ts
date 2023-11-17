// external
import accessible, { isAccessible, W_OK } from '@bevry/fs-accessible'

/** Returns a Promise that rejects with an error if the path is not writable. */
export function writable(path: string | Array<string>): Promise<void> {
	return accessible(path, W_OK)
}
export default writable

/** Returns a Promise that resolves to a boolean indicating if the path is writable or not. */
export function isWritable(path: string): Promise<boolean>
export function isWritable(path: Array<string>): Promise<Array<boolean>>
export function isWritable(
	path: string | Array<string>
): Promise<boolean | Array<boolean>> {
	if (Array.isArray(path)) {
		return Promise.all(path.map((i) => isWritable(i)))
	}
	return isAccessible(path, W_OK)
}
