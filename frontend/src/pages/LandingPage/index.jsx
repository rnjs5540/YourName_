import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDoList from "./Sections/ToDoList";
import MyCalendar from "./Sections/Calendar";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const userData = useSelector((state) => state.user?.userData);

	const fetchProducts = async (userId) => {
		console.log("아이디:::: ", userId);
		try {
			const response = await axiosInstance.get("/toDoItems", {
				params: { filters: userId },
			});
			console.log("리스폰싀: ", response.data.toDoItems);
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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<section>
			<form className="mt-6 flex justify-center items-center">
				<div className="ml-40 mr-10">
					<MyCalendar toDos={toDos} />
				</div>
				<div className="flex-1 min-w-[280px]">
					<ToDoList toDos={toDos} setToDos={setToDos} />
				</div>
			</form>
		</section>
	);
};

export default LandingPage;
