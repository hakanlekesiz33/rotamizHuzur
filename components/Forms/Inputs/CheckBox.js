import React from 'react';
import { Field } from 'formik';

const InputFeedback = ({ error }) =>
  error ? <div >{error}</div> : null;

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};




const CheckBox = (props) => (
  <Field
    component={Checkbox}
    name={props.name}
    id={props.id}
    label={props.label}
    value={props.value}
  />
);

export default CheckBox;