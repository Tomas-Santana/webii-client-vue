import type { Promisify } from "./Promisify";

export function moduleCaller<T extends Object>(
  url: string,
  moduleName: string
) {
  return new Proxy({} as Promisify<T>, {
    get: function (target, prop: string) {
      const className = prop;
      return new Proxy(
        {},
        {
          get: function (target, prop: string) {
            return async (...args: any[]) => {
              const methodName = prop;
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  moduleName,
                  className,
                  methodName,
                  args,
                }),
              });
              const data = await response.json();
              if (data.error) {
                throw new Error(data.error.message);
              }
              return data.data;
            };
          },
        }
      );
    },
  });
}
