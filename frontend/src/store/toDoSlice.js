import { createSlice } from "@reduxjs/toolkit";
import { registerToDo } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
	toDoData: {
		writer: "",
		start: "",
		end: "",
		title: "",
		description: "",
		category: "",
		done: false,
	},
	isLoading: false,
	error: "",
};

const toDoSlice = createSlice({
	name: "toDoItem",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerToDo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerToDo.fulfilled, (state) => {
				state.isLoading = false;
				state.toDoData = initialState.toDoData;
				toast.info("등록을 성공했습니다.");
			})
			.addCase(registerToDo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.toDoData = initialState.toDoData;
				toast.error(action.payload);
			});
	},
});

export default toDoSlice.reducer;
