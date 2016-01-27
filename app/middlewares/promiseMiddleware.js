export default function promiseMiddleware() {
  return next => action => {
    const { promise, types } = action;

    if (!promise) return next(action);

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ type: REQUEST });

    promise
      .then(res => res.json())
      .then(
        res => next({ res: res, type: SUCCESS }),
        error => next({ error, type: FAILURE })
      ).catch(error => {
        console.error(error);
        next({ error, type: FAILURE });
      });
    return promise;
  };
}
