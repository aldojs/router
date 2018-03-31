
/**
 * Ensure the given argument is a function
 * 
 * @param fn
 * @private
 */
export function ensureFunction<T> (fn: T): Function {
  if (typeof fn === 'function') return fn

  throw new TypeError(`Function expected but got ${typeof fn}`)
}

/**
 * Normalize the URL path
 * 
 * @param path
 * @private
 * 
 * @todo add test case for "/" path
 */
export function normalize (path: string): string {
  if (path.endsWith('/')) path = path.slice(0, -1)

  if (!path.startsWith('/')) path = '/' + path

  return path
}
