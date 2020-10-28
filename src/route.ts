
import assert from 'assert'
import { Router } from './router'

export class Route {
  private prefix: string

  constructor (private manager: Router, path?: string, private middlewares: Function[] = []) {
    this.prefix = normalize(path)
  }

  get (path: string, ...fns: Function[]) {
    this.register('GET', path, fns)
    return this
  }

  port (path: string, ...fns: Function[]) {
    this.manager.register('POST', this.prefix + normalize(path), this.compose(fns))
    return this
  }

  private register (method: string, path: string, handlers: Function[]) {
    handlers.forEach((fn) => assert(isFunction(fn), `Expect a function, but got ${typeof fn}`))

    this.manager.register(method, this.prefix + normalize(path), this.compose(handlers))
  }

  private compose (handlers: Function[]): Function {
    return this.middlewares.concat(handlers).reduceRight((a, b) => b(a))
  }
}

function normalize (path: string) {
  if (! path) return ''

  if (path.endsWith('/')) path = path.slice(0, -1)

  return path.startsWith('/') ? '' : `/${path}`
}

function isFunction (arg: any) {
  return typeof arg === 'function'
}
