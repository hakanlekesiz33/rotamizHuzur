import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const axios = require('axios');
const recaptchaRef = React.createRef();
import InputText from '../Inputs/InputText'
import Link from 'next/link';


const SignupSchema = Yup.object().shape({
    code: Yup.string()
        .required('Required'),
    password: Yup.string().required('Parola Gerekli'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Parolalar eşleşmiyor')
});

class ResetForm extends Component {
    state = {
        recaptchaClass: "recaptchaClass"
    };

    onChangeRecaptcha = values => {
        if (values) {
            this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
        }
    }

    onRefreshPassword = async (values) => {

        debugger;
        const form = {
            code: values.code,
            newPassword: values.password
        }
        let res = await axios.post('http://reprep.api.feux.digital/api/auth/confirmPassword', form)
        console.log(res.data);

        debugger;

    }
    onInputChange = (e, inputName, setFieldValue) => {
        setFieldValue(inputName, e.target.value, false)
    }
    render() {

        return (
            <>
                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirmation: '',
                        code: ''

                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {

                        console.log(values);

                        if (!recaptchaRef.current.getValue()) {
                            console.log("recaptchaClass error");
                            this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
                            return; //recaptha dolu değilse formu submit etmeyecek
                        }
                        this.onRefreshPassword(values)


                    }}
                >
                    {({ errors, touched, values, handleSubmit, setFieldValue,
                        setFieldTouched }) => (
                            <Form encType="multipart/form-data">


                                <InputText
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={values.password}
                                    onChange={ev => this.onInputChange(ev, "password", setFieldValue)}
                                    className={
                                        errors.password && touched.password
                                            ? "form-element password error"
                                            : "form-element password"
                                    }
                                />
                                <InputText
                                    type="password"
                                    placeholder="tekrar parola"
                                    name="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    onChange={ev => this.onInputChange(ev, "passwordConfirmation", setFieldValue)}
                                    className={
                                        errors.passwordConfirmation && touched.passwordConfirmation
                                            ? "form-element passwordConfirmation error"
                                            : "form-element passwordConfirmation"
                                    }
                                />
                                <InputText
                                    type="text"
                                    placeholder="Kod"
                                    name="code"
                                    value={values.password}
                                    onChange={ev => this.onInputChange(ev, "code", setFieldValue)}
                                    className={
                                        errors.code && touched.code
                                            ? "form-element code error"
                                            : "form-element code"
                                    }
                                />
                                <div className={this.state.recaptchaClass}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        onChange={this.onChangeRecaptcha}
                                        sitekey="6LcAe7QUAAAAALCSJQT6_fHFvYRzFsYrPtxZ5Mph"
                                    />
                                </div>

                                <button type="submit" className="btn-submit">Parolayı Yenile</button>
                            </Form>
                        )}
                </Formik>

            </>
        )
    }
}


export default ResetForm;