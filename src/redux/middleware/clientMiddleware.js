export default function clientMiddleware(client) {
	return ({dispatch, getState}) => {
		return next => action => {
			if (typeof action === 'function') {
				return action(dispatch, getState);
			}

			const { promise, types, ...rest } = action;
			//if no promise, use normal redux methods with one type
			if (!promise) {
				return next(action);
			}
			//allows for use of multiple types to dispatch
			const [REQUEST, SUCCESS, FAILURE] = types;

			next({ ...rest, type: REQUEST });
			//waits for client promise
			const actionPromise = promise(client);
			//generates success/catches error
			actionPromise.then(
					(result) => next({ ...rest, result, type: SUCCESS }),
					(error) => next({ ...rest, error, type: FAILURE })
			).catch((error)=> {
					next({ ...rest, error, type: FAILURE });
			});

			return actionPromise;
		};
  }
};