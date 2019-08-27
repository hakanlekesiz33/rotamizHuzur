import React from 'react';
import { Field } from 'formik';

const InputFeedback = ({ error }) =>
    error ? <div >{error}</div> : null;

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    children,
    className
}) => {


    return (
        <div className={className}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};



const RadioButtonsGroup = (props) => (
    <RadioButtonGroup
        id={props.id}
        label={props.label}
        value={props.value}
        error={props.error}
        touched={props.touched}
        className={props.className}
    >
        {props.radioButtons.map(radioButton => (
            <Field
                key={radioButton.id}
                component={RadioButton}
                name={radioButton.name}
                id={radioButton.id}
                label={radioButton.label}
            />
        ))}


    </RadioButtonGroup>

);

export default RadioButtonsGroup;