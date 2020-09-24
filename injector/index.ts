export default class Injector {
  private static _root: Map<string, any> = new Map<string, any>();
  private _container: Map<string, any>;

  constructor() {
    this._container = new Map<string, any>();
  }

  add(service: string, instance: any) {
    this._container.set(service, instance);
  }

  // resolve(service: string) {
  //   return this._container.has(service) ? this._container.get(service) : null;
  // }

  resolve<T>(service: string): T | null {
    return this._container.has(service)
      ? (this._container.get(service) as T)
      : null;
  }

  remove(service: string) {
    return this._container.delete(service);
  }
}
