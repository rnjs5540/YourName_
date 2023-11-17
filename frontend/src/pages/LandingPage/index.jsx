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
		try {
			const response = await axiosInstance.get("/toDoItems", {
				params: { filters: userId },
			});
			console.log(response);
			setToDos(response.data.toDoItem);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (userData.id) {
			console.log("랜딩", toDos);
			fetchProducts(userData.id);
		}
	}, []);

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
