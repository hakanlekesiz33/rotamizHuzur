import React, { Component } from 'react';
import { Field } from 'formik';

class Input extends Component {

    render() {

        return (
            <Field
                type={this.props.type}
                placeholder={this.props.placeholder}
                name={this.props.name}
                // value={this.props.value}
                // onChange={this.props.onChange}
                className={this.props.className}
            />
        )
    }
}


export default Input;
