const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleWare = (err, req, res, next) => {
	// return res.status(err.status).json({ msg: err.message });
	// return res.status(500).json({ msg: err });

	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	return res
		.status(500)
		.json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleWare;
