import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { registerToDo } from "../../../../../store/thunkFunctions";

const categories = [
	{ key: 1, value: "공부" },
	{ key: 2, value: "운동" },
	{ key: 3, value: "여가" },
	{ key: 4, value: "과제" },
];

const CustomModal = ({
	// start, end는 상위에서 받아서 옴
	start,
	end,
	value = "",
	description = "",
	category = "",
}) => {
	const userData = useSelector((state) => state.user?.userData);
	const [toDo, setToDo] = useState({
		start,
		end,
		title: value,
		description,
		category,
		done: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setToDo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const dispatch = useDispatch();

	const handleSave = async (e) => {
		e.preventDefault();

		if (start.isSame(end, "date")) {
			const body = {
				writer: userData.id,
				...toDo,
			};
			dispatch(registerToDo(body));
		} else {
			var dayDiff = toDo.end.diff(toDo.start, "days");
			for (var i = 0; i <= dayDiff; ++i) {
				const newStart = moment(toDo.start).add(i, "days").toDate();
				const newEnd = moment(toDo.start)
					.add(i, "days")
					.hour(toDo.end.hour())
					.minute(toDo.end.minute())
					.second(toDo.end.second())
					.toDate();

				// 새로운 toDo 객체 생성
				const newToDo = {
					...toDo,
					start: newStart,
					end: newEnd,
				};

				const body = {
					writer: userData.id,
					...newToDo,
				};
				dispatch(registerToDo(body));
			}
		}

		window.location.reload();
	};

	// 모달에 표시할 텍스트 렌더링
	const renderText = () => {
		return start.isSame(end, "date")
			? `${moment(start).format("MM월 DD일, HH:mm")} - ${end.format(
					"HH:mm"
			  )}`
			: start.month() === end.month()
			? `${moment(start).format("MM월 DD")}-${moment(end).format(
					"DD일"
			  )}, ${start.format("HH:mm")} - ${end.format("HH:mm")}`
			: `${moment(start).format("MM월 DD일")} - ${moment(end).format(
					"MM월 DD일"
			  )}, ${start.format("HH:mm")} - ${end.format("HH:mm")}`;
	};

	return (
		<div className="customModal">
			<div className="customModal__text">{renderText()}</div>
			<input
				name="title"
				className="w-full bg-white border rounded"
				type="text"
				placeholder="제목 추가"
				value={toDo.title}
				onChange={handleChange}
				required
			/>
			<textarea
				name="description"
				className="w-full bg-white border rounded"
				placeholder="설명 추가"
				value={toDo.description}
				onChange={handleChange}
			/>
			<select
				name="category"
				className="px-2 py-1 bg-white border rounded"
				value={toDo.category}
				onChange={handleChange}
			>
				<option value="">분류 선택</option>
				{categories.map((item) => (
					<option key={item.key} value={item.value}>
						{item.value}
					</option>
				))}
			</select>
			<button className="customModal__button" onClick={handleSave}>
				등록
			</button>
		</div>
	);
};

CustomModal.propTypes = {
	start: PropTypes.object,
	end: PropTypes.object,
	value: PropTypes.string,
	description: PropTypes.string,
	category: PropTypes.string,
};

export default CustomModal;
