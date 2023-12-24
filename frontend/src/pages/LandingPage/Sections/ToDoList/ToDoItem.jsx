import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import moment from "moment";
import axiosInstance from "../../../../utils/axios";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
	const onChangeCheckbox = () => {
		const nextTodoList = todoList.map((item) => ({
			...item,
			// id 값이 같은 항목의 checked 값을 Toggle
			done: item._id === todoItem._id ? !item.done : item.done,
		}));

		todoItem.done = !todoItem.done;
		setTodoList(nextTodoList);
	};

	const handleDelete = async (e) => {
		try {
			await axiosInstance.delete("/toDoItems", e.target);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<li className="flex flex-col mt-[30px]">
			<input
				type="checkbox"
				className="mr-2.5"
				checked={todoItem.done}
				onChange={onChangeCheckbox}
			/>

			{/* 제목 */}
			<span
				className={`flex-1 ${
					todoItem.done ? "italic line-through text-[#868e96]" : ""
				}`}
			>
				{todoItem.title}
			</span>
			{/* 설명 */}
			<span
				className={`flex-1 text-xs text-[#868e96] 
							${todoItem.done ? "italic line-through" : ""}`}
			>
				{todoItem.description}
			</span>
			{/* 날짜, 시간 */}
			<span
				className={`flex-1 text-xs text-[#868e96] 
							${todoItem.done ? "italic line-through" : ""}`}
			>
				{moment(todoItem.start).format("MM월 DD일, HH:mm")} -
				{moment(todoItem.end).format("HH:mm")}
			</span>
			{/* 분류 */}
			<span
				className={`flex-1 text-xs text-[#868e96] 
							${todoItem.done ? "italic line-through" : ""}`}
			>
				{todoItem.category}
			</span>

			{/* 삭제 버튼 */}
			<button
				type="button"
				className="h-9 w-9 bg-inherit rounded-none border-[none]"
				onClick={handleDelete}
			>
				<BiSolidTrash />
			</button>
		</li>
	);
};

export default ToDoItem;
