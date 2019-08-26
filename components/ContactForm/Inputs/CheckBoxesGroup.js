import React from 'react';
import { Field } from 'formik';


// Checkbox input
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

const InputFeedback = ({ error }) =>
    error ? <div >{error}</div> : null;


class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        const target = event.currentTarget;
        let valueArray = [...this.props.value] || [];

        if (target.checked) {
            valueArray.push(target.id);
        } else {
            valueArray.splice(valueArray.indexOf(target.id), 1);
        }

        this.props.onChange(this.props.id, valueArray);
    };

    handleBlur = () => {
        // take care of touched
        this.props.onBlur(this.props.id, true);
    };

    render() {
        const { value, error, touched, label, children } = this.props;
        return (
            <div>
                <fieldset>
                    <legend>{label}</legend>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, {
                            field: {
                                value: value.includes[child.props.id],
                                onChange: this.handleChange,
                                onBlur: this.handleBlur
                            }
                        });
                    })}
                    {touched && <InputFeedback error={error} />}
                </fieldset>
            </div>

        );
    }
}




const CheckBoxesGroup = (props) => (
    <CheckboxGroup
        id={props.id}
        label={props.label}
        value={props.value}
        error={props.error}
        touched={props.touched}
        onChange={props.onChange}
        onBlur={props.onBlur}
    >
        {props.checkBoxes.map(chk => (
            <Field
                key={chk.id}
                component={Checkbox}
                name={chk.name}
                id={chk.id}
                label={chk.label}
            />
        ))}


    </CheckboxGroup>

);

export default CheckBoxesGroup;
