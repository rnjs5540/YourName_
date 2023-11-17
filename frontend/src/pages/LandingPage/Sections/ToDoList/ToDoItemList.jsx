import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoItemList = ({ title, todoList, setTodoList, doneList }) => {
	return (
		<div className="flex flex-col mt-[30px]">
			{/* props로 부터 title 값을 전달 받음 */}
			<p className="font-[bold] m-0">{title}</p>
			<ul className="flex flex-col justify-center p-0 list-none">
				{todoList &&
					todoList.map((todoItem) => {
						if (doneList !== todoItem.done) return null;
						return (
							<ToDoItem
								key={todoItem.id}
								todoItem={todoItem}
								todoList={todoList}
								setTodoList={setTodoList}
							/>
						);
					})}
			</ul>
		</div>
	);
};

export default ToDoItemList;
