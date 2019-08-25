import React, { Component } from 'react';
import * as Yup from 'yup';


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
export default CheckboxGroup;