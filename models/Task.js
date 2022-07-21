// mongoose automatically looks for the plural, lowercased version of the model name.
// Therefore the model "Task" will be for the "tasks" collection in the database.

// instance of a model is a document

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		// can just be a regular boolean rather than array if you don't need a message
		required: [true, 'must provide name'],
		trim: true,
		maxlength: [20, 'name can not be more than 20 characters'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Task', TaskSchema);
