export default function promiseMiddleware() {
  return next => action => {
    const { promise, types } = action;

    if (!promise) return next(action);

    const [SUCCESS, FAILURE] = types;
    return promise
      .then(
        res => {
          next({ res: res.body, type: SUCCESS })
        }
      ).catch(error => {
        console.error('ERROR FROM API:', error);
        next({ error, type: FAILURE });
      });
  };
}
