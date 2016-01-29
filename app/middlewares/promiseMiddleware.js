export default function promiseMiddleware() {
  return next => action => {
    const { promise, types } = action;

    if (!promise) return next(action);

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ type: REQUEST });

    return promise
      .then(handleErrors)
      .then(res => res.json())
      .then(
        res => next({ res, type: SUCCESS })
      ).catch(error => {
        console.error(error);
        next({ error, type: FAILURE });
      });
  };
}

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.error);
  }
  return response;
}
