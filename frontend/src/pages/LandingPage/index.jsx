import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDoList from "./Sections/ToDoList";
import MyCalendar from "./Sections/Calendar";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [email, setEmail] = useState("");
	const userData = useSelector((state) => state.user?.userData);

	const fetchProducts = async (userId) => {
		console.log("아이디:::: ", userId);
		try {
			const response = await axiosInstance.get("/toDoItems", {
				params: { filters: userId },
			});
			setToDos(response.data.toDoItems);
			setIsLoading(false);
		} catch (error) {
			console.error("에러:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (userData.id) {
			console.log("랜딩", toDos);
			fetchProducts(userData.id);
		}
	}, []);

	useEffect(() => {
		console.log("투두 업데이트됨: ", toDos);
	}, [toDos]);

	const handleSubmit = async (event) => {
		if (event) event.preventDefault();

		// 친구이메일로 친구유저찾기
		try {
			const response = await axiosInstance.get("/users/findByEmail", {
				params: { filters: email },
			});
			console.log("응답", response);
			fetchProducts(response.data.friend._id);
			setIsLoading(false);
		} catch (error) {
			console.error("에러:", error);
			setIsLoading(false);
		}

		// 친구유저Id로 일정검색하기
		userId = response._id;
		fetchProducts(userId);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<section>
			{/* 검색창 */}
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="mt-6 ml-auto w-1/3 flex justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md"
			>
				<input
					type="text"
					placeholder="친구 이메일 입력"
					className="p-1 rounded text-black"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
