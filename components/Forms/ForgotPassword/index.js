import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const axios = require('axios');
const recaptchaRef = React.createRef();
import InputText from '../Inputs/InputText'
import Link from 'next/link';


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Geçersiz email')
        .required('Required'),
});

class ForgotPassword extends Component {
    state = {
        recaptchaClass: "recaptchaClass",
        infoPassForget: false
    };

    onChangeRecaptcha = values => {
        if (values) {
            this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
        }
    }

    onResetPassword =async (values) => {

       let res = await axios.post('https://localhost:44302/api/auth/resetPassword', values)
       console.log(res.data);

        debugger;
        if(res.data){
            this.setState({ ...this.state, infoPassForget: true });
        }
    }
    render() {
        const isInfo = this.state.infoPassForget 

        return (
            <>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {


                        // if (!recaptchaRef.current.getValue()) {
                        //     console.log("recaptchaClass error");
                        //     this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
                        //     return; //recaptha dolu değilse formu submit etmeyecek
                        // }

                        this.onResetPassword(values)


                    }}
                >
                    {({ errors, touched, values, handleSubmit, setFieldValue,
                        setFieldTouched }) => (
                            <Form encType="multipart/form-data">

                                <InputText
                                    type="text"
                                    placeholder="Email Adresini Giriniz"
                                    name="email"
                                    className={
                                        errors.email && touched.email
                                            ? "form-element email error"
                                            : "form-element email"
                                    }
                                />
                                <div className={this.state.recaptchaClass}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        onChange={this.onChangeRecaptcha}
                                        sitekey="6LcAe7QUAAAAALCSJQT6_fHFvYRzFsYrPtxZ5Mph"
                                    />
                                </div>
                                {isInfo ? (
                                    <Link href="/passwordReset">
                                    <a>Şifre sıfırlama parolası email adresinize gönderilmiştir</a>
                                  </Link>
      ) : (
       null
      )}
                                <button type="submit" className="btn-submit">Gönder</button>
                            </Form>
                        )}
                </Formik>

            </>
        )
    }
}


export default ForgotPassword;