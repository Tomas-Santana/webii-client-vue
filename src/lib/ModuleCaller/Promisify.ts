export type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R
    ? (...args: Parameters<T[K]>) => Promise<R>
    : T[K] extends object
    ? Promisify<T[K]>
    : never;
};
