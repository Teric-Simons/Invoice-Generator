import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ selected, onChangefunc, name }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={(date) => onChangefunc(name, date)}
      name={name}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default Calendar;
