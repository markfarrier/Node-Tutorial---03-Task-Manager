const asyncWrapper = (fn) => {
	// express returns req, res, and next by default - so this will have access to it via the argument function
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			// passing it into the next middleware
			next(error);
		}
	};
};

module.exports = asyncWrapper;
