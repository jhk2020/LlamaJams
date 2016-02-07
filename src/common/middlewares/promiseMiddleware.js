export default function promiseMiddleware() {
  return next => action => {
    const { promise, types } = action;

    if (!promise) return next(action);

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ type: REQUEST });

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
