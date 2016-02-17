export const methodWrapper = (gyreId, api, mEvents) => {
  const originalAPI = api;
  return Object.keys(originalAPI).reduce((methods, apiMethod) => {
    methods[apiMethod] = (...args) => {
      let result;
      try {
        result = originalAPI[apiMethod](...args);
        if (mEvents[apiMethod] && mEvents[apiMethod].ok) {
          mEvents[apiMethod].ok(gyreId, args);
        }
      }
      catch (e) {
        if (mEvents[apiMethod] && mEvents[apiMethod].fail) {
          mEvents[apiMethod].fail(gyreId, args, e.name + ":" + e.message);
          console.error(e.name + ":" + e.message); // eslint-disable-line no-console
        }
        else {
          throw e;
        }
      }
      return result;
    };
    return methods;
  }, {});
};