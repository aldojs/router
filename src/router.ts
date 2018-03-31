
import Route from './route'
import * as assert from 'assert'
import * as createDebugger from 'debug'

const debug = createDebugger('aldo:router')

/**
 * Routes factory and manager
 */
export default class {
  private _handlers: Function[] = []
  private _routes: Route[] = []
  private _prefix: string

  /**
   * Initialize a new 
   * 
   * @param prefix
   */
  public constructor (prefix = '') {
    this._prefix = _normalize(prefix)
  }

  /**
   * Set the path prefix for all routes
   * 
   * @param path The path prefix
   */
  public prefix (path: string): this {
    this._prefix = _normalize(path)

    debug(`update route prefix to ${this._prefix}`)

    // set the prefix for the registered routes
    for (let route of this._routes) {
      route.prefix(path)
    }

    return this
  }

  /**
   * Get all defined routes
   */
  public routes (): Route[] {
    return this._routes
  }

  /**
   * Create and add a route into the list
   * 
   * @param path
   */
  public route (path: string): Route {
    var route = new Route(_normalize(path), this._prefix)

    debug(`create route for ${path}`)
    this._routes.push(route)

    return route
  }

  /**
   * Use global handlers
   * 
   * @param fns
   */
  public use (...fns: Function[]) {
    for (let fn of fns) {
      this._handlers.push(_ensureFunction(fn))
      debug(`use route handler: ${fn.name || '<anonymous>'}`)
    }

    return this
  }

  /**
   * Make new route and set the fns for HEAD method
   * 
   * @param path
   * @param fns
   */
  public head (path: string, ...fns: Function[]): Route {
    return this.route(path).head(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for GET method
   * 
   * @param path
   * @param fns
   */
  public get (path: string, ...fns: Function[]): Route {
    return this.route(path).get(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for POST method
   * 
   * @param path
   * @param fns
   */
  public post (path: string, ...fns: Function[]): Route {
    return this.route(path).post(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for PUT method
   * 
   * @param path
   * @param fns
   */
  public put (path: string, ...fns: Function[]): Route {
    return this.route(path).put(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for PATCH method
   * 
   * @param path
   * @param fns
   */
  public patch (path: string, ...fns: Function[]): Route {
    return this.route(path).patch(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for DELETE method
   * 
   * @param path
   * @param fns
   */
  public delete (path: string, ...fns: Function[]): Route {
    return this.route(path).delete(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for OPTIONS method
   * 
   * @param path
   * @param fns
   */
  public options (path: string, ...fns: Function[]): Route {
    return this.route(path).options(...this._handlers.concat(fns));
  }

  /**
   * Make new route and set the fns for accepted methods
   * 
   * @param path
   * @param fns
   */
  public all (path: string, ...fns: Function[]): Route {
    return this.route(path).all(...this._handlers.concat(fns))
  }

  /**
   * Make new route and set the fns for the given HTTP method
   * 
   * @param methods
   * @param path
   * @param fns
   */
  public any (methods: string[], path: string, ...fns: Function[]): Route {
    return this.route(path).any(methods, ...this._handlers.concat(fns))
  }
}

/**
 * Ensure the given argument is a function
 * 
 * @param fn
 * @private
 */
function _ensureFunction<T> (fn: T): Function {
  if (typeof fn === 'function') return fn

  throw new TypeError(`Function expected but got ${typeof fn}`)
}

/**
 * Normalize the URL path
 * 
 * @param path
 * @private
 */
function _normalize (path: string): string {
  if (path.endsWith('/')) path = path.slice(0, -1)

  if (!path.startsWith('/')) path = '/' + path

  return path
}
