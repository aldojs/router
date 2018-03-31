
declare type Handler = (ctx: { [x: string]: any; }) => any;

declare interface Route {
  readonly path: string;
  readonly name: string;

  as(name: string): Route;
  prefix(value: string): Route;
  all(...fns: Handler[]): Route;
  get(...fns: Handler[]): Route;
  put(...fns: Handler[]): Route;
  head(...fns: Handler[]): Route;
  post(...fns: Handler[]): Route;
  patch(...fns: Handler[]): Route;
  delete(...fns: Handler[]): Route;
  options(...fns: Handler[]): Route;
  handlers(): [string, Handler[]][];
  any(methods: string[], ...fns: Handler[]): Route;
}

declare interface Router {
  routes(): Route[];
  prefix(value: string): Router;
  route(path: string): Route;
  use(...fns: Handler[]): Router;
  all(path: string, ...fns: Handler[]): Route;
  get(path: string, ...fns: Handler[]): Route;
  put(path: string, ...fns: Handler[]): Route;
  head(path: string, ...fns: Handler[]): Route;
  post(path: string, ...fns: Handler[]): Route;
  patch(path: string, ...fns: Handler[]): Route;
  delete(path: string, ...fns: Handler[]): Route;
  options(path: string, ...fns: Handler[]): Route;
  any(method: string[], path: string, ...fns: Handler[]): Route;
}
