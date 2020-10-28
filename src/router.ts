
import assert from 'assert'
import { METHODS } from 'http'
import { Route } from './route'

export class Router {
  constructor (private store: Storage) {
  }

  register (method: string, pattern: string, fn: Function) {
    assert(isFunction(fn), `Expect a function, but got ${typeof fn}`)
    assert(METHODS.includes(method), `Expect a valid HTTP method, given "${method}"`)

    let handlers = this.store.get(pattern) || {}

    assert(! handlers[method], `Duplicate route definition: ${method} ${pattern}`)

    this.store.set(pattern, { ...handlers, [method]: fn })

    return this
  }

  match (method: string, path: string): Match {
    let fn: any, params = {}, handlers = this.store.match(path, params) || {}

    if ((fn = handlers[method.toUpperCase()])) return ({
      methods: Object.getOwnPropertyNames(handlers), handler: fn, params
    })
  }

  /**
   * Create a route instance for the given prefix.
   * 
   * @param prefix the URL prefix
   */
  route (prefix = '') {
    return new Route(this, prefix)
  }
}

export interface Storage {
  set (path: string, data: { [x: string]: Function }): any
  get (path: string): { [x: string]: Function } | undefined
  match (path: string, params: any): { [x: string]: Function } | undefined
}

export interface Match {
  handler: Function
  methods: string[]
  params: {
    [x: string]: string
  }
}

function isFunction (arg: any) {
  return typeof arg === 'function'
}
