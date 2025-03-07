import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Calendar 
        onChange={setDate} 
        value={date} 
        className="border-none w-full"
      />
    </>
  );
};

export default CalendarComponent;
