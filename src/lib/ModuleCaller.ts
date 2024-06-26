export function moduleCaller<T extends Object>(
  url: string,
  moduleName: string
) {
  return new Proxy({} as T, {
    get: function (target, prop: string) {
      const className = prop;
      return new Proxy(
        {},
        {
          get: function (target, prop: string) {
            return new Proxy(
              {},
              {
                apply: async function (target, thisArg, argumentsList) {
                  const response = await fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      moduleName,
                      className,
                      functionName: prop,
                      args: argumentsList,
                    }),
                  });
                  return response.json();
                },
              }
            );
          },
        }
      );
    },
  });
}
