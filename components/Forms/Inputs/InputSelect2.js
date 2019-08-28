import React, { Component } from 'react';
import { Field } from 'formik';
import Select from 'react-select';

class InputSelect2 extends Component {

    render() {

        return (
            <Select
            key={this.props.id}
            name={this.props.name}
            id={this.props.id}
            value={this.props.value}
            onChange={this.props.onChange}
            options={this.props.options}
            isMulti={this.props.isMulti}
            isDisabled={this.props.isDisabled}
          />
        )
    }
}


export default InputSelect2;
