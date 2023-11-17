import React, { useEffect, useState } from "react";
import WeekCalendar from "react-week-calendar";
import "react-week-calendar/dist/style.less";
import CustomModal from "./CustomModal";
import moment from "moment";

const MyCalendar = ({ toDos }) => {
	const [events, setEvents] = useState([]);

	console.log("캘린더", toDos);
	useEffect(() => {
		if (toDos && Array.isArray(toDos)) {
			const fetchedEvents = toDos.map((toDo) => ({
				start: moment(toDo.start),
				end: moment(toDo.end),
			}));

			console.log("페치드", fetchedEvents);

			setEvents(fetchedEvents);
		}
	}, [toDos]);

	return (
		<div className="text-center font-family: sans-serif">
			<h1 className="py-[10px] text-3xl">WEEKLY CALENDAR</h1>
			<WeekCalendar
				selectedIntervals={events}
				modalComponent={(props) => <CustomModal {...props} />}
			/>
		</div>
	);
};

export default MyCalendar;
