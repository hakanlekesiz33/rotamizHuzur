import React, { Component } from 'react';
import '../styles/contact.scss';
import '../styles/formElements.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const axios = require('axios');
const recaptchaRef = React.createRef();
import MaskedInput from "react-text-mask";

import { connect } from 'react-redux';
import initsStore from '../store/store';


const phoneNumberMask = [
    "(",
    "+",
    "9",
    "0",
    ")",
    " ",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

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

// Checkbox group
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
                                value: value.includes(child.props.id),
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
const InputFeedback = ({ error }) =>
    error ? <div >{error}</div> : null;

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    children
}) => {


    return (
        <div>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    radioGroup: Yup.string().required("A radio option is required"),
    checkboxGroup: Yup.array().required(
        "At least one checkbox is required"
    ),
    singleCheckbox: Yup.bool().oneOf([true], "Must agree to something"),
    color: Yup.string().required('Color is required!'),
    // file: Yup.mixed().required()
});



class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
            alt={file.name}
            height={200}
            width={200} />);
    }
}


class Contact extends Component {



    state = {
        recaptchaClass: "recaptchaClass"
    };





    onChange = values => {
        if (values) {
            console.log("onchange .......");
            this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
            console.log(this.state);

        }
    }

    render() {
        return (
            <div id='contact'>
                <div className="gridWrapper">
                    <div className="row">
                        <div className="topRow">
                            <h1>Contact</h1>
                            <p>Orci pellentesque ullamcorper erat, suscipit viverra non sit venenatis ipsum volutpat. Condimentum nunc, dolor dignissim eros vestibulum, fusce gravida quis recusandae, vehic</p>
                        </div>
                        <div className="contactWrapper">
                            <div className="topInfo">
                                <div className="info">
                                    <h3>Address</h3>
                                    <p>Flat 60, RoGreenSouth</p>
                                    <p> Lilyberg, Q7M 8ZV</p>
                                </div>
                                <div className="info">
                                    <h3>Email</h3>
                                    <p>huel.simone@hotmail.com</p>
                                    <p>yframi@yahoo.com </p>
                                </div>
                                <div className="info">
                                    <h3>Phone</h3>
                                    <p>454-6322290</p>
                                    <p>314-8470569 654-2003041</p>
                                </div>
                            </div>
                            <div className="form" style={{ zIndex: 500 }}>
                                <h3>Send Your Message</h3>
                                <Formik
                                    initialValues={{
                                        name: '',
                                        email: '',
                                        file: '',
                                        phone: '',
                                        radioGroup: "",
                                        checkboxGroup: [],
                                        singleCheckbox: false

                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={values => {
                                        if (!recaptchaRef.current.getValue()) {
                                            this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
                                            return; //recaptha dolu değilse formu submit etmeyecek
                                        }
                                        const user = {
                                            username: "hakan",
                                            password: "123456"
                                        }

                                        let tkn;
                                        axios.post('https://localhost:44302/api/token/token', user
                                        ).then(function (response) {
                                            return response.data.token;
                                        })
                                            .then(function (token) {
                                                const ctf =
                                                {
                                                    name: values.name,
                                                    message: values.message,
                                                    email: values.email
                                                }
                                                var bodyFormData = new FormData();
                                                bodyFormData.append('file', values.file);
                                                bodyFormData.append('contactForm', JSON.stringify(ctf));
                                                tkn = token

                                                const headers = {
                                                    'Content-Type': 'multipart/form-data',
                                                    'Authorization': 'bearer ' + token
                                                }
                                                axios.post('https://localhost:44302/api/values/upload', bodyFormData, {
                                                    headers: headers

                                                }).then(function (res) {
                                                    console.log(res)
                                                })
                                            })
                                            .catch(function (error) {
                                                console.log(error.config);
                                            });
                                    }}
                                >
                                    {({ errors, touched, values, handleSubmit, setFieldValue,
                                        setFieldTouched }) => (
                                            <Form encType="multipart/form-data">


                                                <Field type="text" placeholder="Adınız" name="name" className={
                                                    errors.name && touched.name
                                                        ? "form-control error"
                                                        : "form-control"
                                                } />

                                                <Field type="text" placeholder="Email Adresi" name="email" className={
                                                    errors.email && touched.email
                                                        ? "form-control error"
                                                        : "form-control"
                                                } />
                                                <h2>Single checkbox</h2>
                                                <Field
                                                    component={Checkbox}
                                                    name="singleCheckbox"
                                                    id="singleCheckbox"
                                                    label="Agree to something"
                                                />

                                                <h2>Checkbox group</h2>
                                                <CheckboxGroup
                                                    id="checkboxGroup"
                                                    label="Which of these?"
                                                    value={values.checkboxGroup}
                                                    error={errors.checkboxGroup}
                                                    touched={touched.checkboxGroup}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                >
                                                    <Field
                                                        component={Checkbox}
                                                        name="checkboxGroup"
                                                        id="checkbox1"
                                                        label="Option 1"
                                                    />
                                                    <Field
                                                        component={Checkbox}
                                                        name="checkboxGroup"
                                                        id="checkbox2"
                                                        label="Option 2"
                                                    />
                                                    <Field
                                                        component={Checkbox}
                                                        name="checkboxGroup"
                                                        id="checkbox3"
                                                        label="Option 3"
                                                    />
                                                </CheckboxGroup>
                                                <h2>Radio group</h2>
                                                <RadioButtonGroup
                                                    id="radioGroup"
                                                    label="One of these please"
                                                    value={values.radioGroup}
                                                    error={errors.radioGroup}
                                                    touched={touched.radioGroup}
                                                >
                                                    <Field
                                                        component={RadioButton}
                                                        name="radioGroup"
                                                        id="radioOption1"
                                                        label="Choose this option"
                                                    />
                                                    <Field
                                                        component={RadioButton}
                                                        name="radioGroup"
                                                        id="radioOption2"
                                                        label="Or choose this one"
                                                    />
                                                </RadioButtonGroup>
                                                <select
                                                    name="color"
                                                    value={values.color}

                                                    style={{ display: 'block' }}
                                                >
                                                    <option value="" label="Select a color" />
                                                    <option value="red" label="red" />
                                                    <option value="blue" label="blue" />
                                                    <option value="green" label="green" />
                                                </select>
                                                {errors.color &&
                                                    touched.color &&
                                                    <div className="input-feedback">
                                                        {errors.color}
                                                    </div>}

                                                <Field component="textarea" className="form-control-lg" rows="5" placeholder="Type Comment" name="message" />
                                                <label>Dosya Yükleyiniz</label>
                                                <input id="file" name="file" type="file" onChange={(event) => {
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                }} className="form-control" />
                                                <label htmlFor="phone" style={{ display: "block" }}>
                                                    Phone Number
            </label>

                                                <Field
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <MaskedInput
                                                            {...field}
                                                            mask={phoneNumberMask}
                                                            id="phone"
                                                            placeholder="Enter your phone number"
                                                            type="text"

                                                            className={
                                                                errors.phone && touched.phone
                                                                    ? "text-input error"
                                                                    : "text-input"
                                                            }
                                                        />
                                                    )}
                                                />

                                                {errors.phone && touched.phone && (
                                                    <div className="input-feedback">{errors.phone}</div>
                                                )}
                                                <Thumb file={values.file} />
                                                <div className={this.state.recaptchaClass}>
                                                    <ReCAPTCHA
                                                        ref={recaptchaRef}
                                                        onChange={this.onChange}
                                                        sitekey="6LcAe7QUAAAAALCSJQT6_fHFvYRzFsYrPtxZ5Mph"
                                                    />
                                                </div>

                                                <button type="submit" className="btn-submit">Send Message</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(Contact);