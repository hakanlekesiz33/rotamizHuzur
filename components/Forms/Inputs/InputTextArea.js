import React from 'react';
import { Field } from 'formik';

const InputTextArea = (props) => (
    <Field
        key={props.id}
        component="textarea"
        name={props.name}
        className={props.className}
        rows={props.rows}
        placeholder={props.placeholder}
    >
    </Field>
);

export default InputTextArea;