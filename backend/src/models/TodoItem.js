// import moment from 'moment';

const { default: mongoose, Schema } = require("mongoose");

const toDoItemSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
		maxLength: 30,
		required: true,
	},
	description: String,
	category: String,
	done: Boolean,
});

const ToDoItem = mongoose.model("ToDoItem", toDoItemSchema);

module.exports = ToDoItem;
