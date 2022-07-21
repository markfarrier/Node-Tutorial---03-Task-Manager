const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});

	// same as tasks:tasks
	res.status(200).json({ tasks });

	// alternative options:

	// res.status(200).json({ tasks, amount:tasks.length });
	// res.status(200).json({ success:true, data:{tasks,nbHits:tasks.length} });
	// if response is contains 'data' you should change the front-end code in showTasks (browser-app.js) to be const {data:{data:{tasks}}}
	// instead of {const{data:tasks}}
	// refer to end of Response Types tutorial.  This is due to the fact that axios returns 'data'.
	// res.status(200).json({
	// 	status: 'success',
	// 	data: { tasks, nbHits: tasks.length },
	// });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	// if the right syntax but there's no matching id
	if (!task) {
		// return res.status(404).json({ msg: `No task with id : ${taskID}` });

		// const error = new Error('Not Found');
		// error.status = 404;
		// return next(error);

		return next(createCustomError(`No task with id : ${taskID}`, 404));
	}
	res.status(200).json({ task });
	// if the id syntax is wrong (e.g. wrong amount of characters) - error will be caught in asyncWrapper
});
const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	// res.status(200).json({ id: taskID, data: req.body });
	// needs new:true otherwise it will return the original value
	// needs runValidators otherwise it won't run the validation
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return next(createCustomError(`No task with id : ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

// demonstration of difference between PUT and PATCH (put will overwrite if parameters are left empty - i.e. remove those parameters)
// const editTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;

// 		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
// 			new: true,
// 			runValidators: true,
// 			overwrite: true,
// 		});
// 		if (!task) {
// 			return res.status(404).json({ msg: `No task with id : ${taskID}` });
// 		}
// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
		return next(createCustomError(`No task with id : ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
