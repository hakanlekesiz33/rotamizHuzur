import React from 'react';
import { Field } from 'formik';
import DatePicker from "react-datepicker";

const DatePickerField = ({ name, value, onChange }) => {
    return (
        <DatePicker
            selected={(value && new Date(value)) || null}
            onChange={val => {
                onChange(name, val);
            }}
        />
    );
};




const datePicker = (props) => (
    <DatePickerField
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
    />
);

export default datePicker;