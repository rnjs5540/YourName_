const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ToDoItem = require("../models/TodoItem");

router.get("/", auth, async (req, res, next) => {
	console.log("4143242424324");
	// const order = req.query.order ? req.query.order : "desc";
	// const sortBy = req.query.sortBy ? req.query.sortBy : "start";

	try {
		const userId = req.query.filters;
		const toDoItems = await ToDoItem.find({
			writer: userId,
		});
		console.log("투두:", toDoItems);
		return res.status(200).json({
			toDoItems,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/registerToDo", auth, async (req, res, next) => {
	try {
		const toDoItem = new ToDoItem(req.body);
		await toDoItem.save();
		return res.sendStatus(201);
	} catch (error) {
		next(error);
	}
});

// router.delete("/deleteToDo", auth, async (req, res, next) => {
// 	const { id } = req.params;
// 	try {
// 		// findByIdAndRemove 함수를 사용하여 특정 id값을 가진 데이터를 삭제한다.
// 		await Post.findByIdAndRemove(id).exec();
// 		return res.status(204).end(); // No Content (성공하였지만 응답할 데이터는 없음)
// 	} catch (err) {
// 		return res.status(500).json({ error: err });
// 		next(err);
// 	}
// });

module.exports = router;
