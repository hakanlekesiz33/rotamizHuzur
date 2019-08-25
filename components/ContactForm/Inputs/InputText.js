import React, { Component } from 'react';
import { Field } from 'formik';

class Input extends Component {

    render() {

        return (
            <Field type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} 
            className={
                this.props.isValid && this.props.isTouched
                    ? "form-control error"
                    : "form-control"
            } />
        )
    }
}


export default Input;
