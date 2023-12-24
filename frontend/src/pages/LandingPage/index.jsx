import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ToDoList from "./Sections/ToDoList";
import MyCalendar from "./Sections/Calendar";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [weekCount, setWeekCount] = useState(/*** */);
	const [inputEmail, setInputEmail] = useState("");
	const userData = useSelector((state) => state.user?.userData);

	const fetchTodo = async (userId, week) => {
		// console.log("아이디:::: ", userId);
		try {
			const response = await axiosInstance.get("/toDoItems", {
				params: { writer: userId, week: week },
			});
			setToDos(response.data.toDoItems);
			setIsLoading(false);
		} catch (error) {
			console.error("에러:", error);
			setIsLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		if (event) event.preventDefault();

		// 해당 이메일의 todo 가져오기
		try {
			const response = await axiosInstance.get("/users/findByEmail", {
				params: { filters: inputEmail },
			});
			const userId = response.data.friend._id;
			fetchTodo(userId, weekCount);
			setIsLoading(false);
		} catch (error) {
			console.error("에러:", error);
			setIsLoading(false);
		}
	};

	// useEffect(() => {
	// 	if (isLoading) return <div>Loading..</div>;
	// }, [isLoading]);

	useEffect(() => {
		const initialize = async () => {
			setIsLoading(true);
			const userId = userData["id"];
			if (userId && weekCount !== undefined) {
				await fetchTodo(userId, weekCount);
			}
			setIsLoading(false);
		};

		initialize(); // 초기화 함수 실행
	}, [userData, weekCount]); // 초기화, weekCount가 변경될 때마다 실행

	console.log(toDos);
	return (
		<section>
			{/* 이메일 검색창 */}
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="mt-6 ml-auto w-1/3 flex justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md"
			>
				<input
					type="text"
					placeholder="검색할 이메일 입력"
					className="p-1 rounded text-black"
					value={inputEmail}
					onChange={(e) => setInputEmail(e.target.value)}
				/>
				<button type="submit" className="ml-2">
					검색
				</button>
			</form>

			<div className="flex justify-center items-center">
				<div className="ml-40 mr-10">
					<MyCalendar toDos={toDos} />
				</div>
				<div className="flex-1 min-w-[280px]">
					<ToDoList toDos={toDos} setToDos={setToDos} />
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
