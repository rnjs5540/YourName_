import React from "react";
import ToDoItemList from "./ToDoItemList";

const ToDoList = ({ toDos, setToDos }) => {
	return (
		<div className="w-full flex flex-col justify-center py-[10px] border border-gray-500">
			{/* 할 일 Item 리스트 */}
			<ToDoItemList
				title={"할 일"}
				todoList={toDos}
				setTodoList={setToDos}
				doneList={false} // (체크되지 않은) 할 일 목록
			/>
			{/* 완료한 Item 리스트 */}
			<ToDoItemList
				title={"완료한 항목"}
				todoList={toDos}
				setTodoList={setToDos}
				doneList={true} // (체크되어 있는)완료한 목록
			/>
		</div>
	);
};

export default ToDoList;
