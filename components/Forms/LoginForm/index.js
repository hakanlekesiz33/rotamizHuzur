import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const axios = require('axios');
const recaptchaRef = React.createRef();
import InputText from '../Inputs/InputText'
import Link from 'next/link';


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

class LoginForm extends Component {
  state = {
    recaptchaClass: "recaptchaClass"
  };

  onChangeRecaptcha = values => {
    if (values) {
      this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
    }
  }

  onInputChange = (e,inputName, setFieldValue) => {
    let inputValue=e.target.value;
    if(!(/^[-]*$/.test(inputValue.slice(-1)) || /^[0-9a-zA-Z]*$/.test(inputValue.slice(-1)))){
      inputValue = inputValue.replace(/.$/,'')
    }
    setFieldValue(inputName, inputValue, false)
  }
  render() {

    return (
      <>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {

            console.log(values);
            const user = {
              username: values.username,
              password: values.password
            }
            axios.post('https://localhost:44302/api/auth/login', user
            ).then(function (response) {
              console.log(response);
            })

            if (!recaptchaRef.current.getValue()) {
              console.log("recaptchaClass error");
              this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
              return; //recaptha dolu değilse formu submit etmeyecek
            }

          }}
        >
          {({ errors, touched, values, handleSubmit, setFieldValue,
            setFieldTouched }) => (
              <Form encType="multipart/form-data">

                <InputText
                  type="text"
                  placeholder="Kullanıcı Adı"
                  name="username"
                  value={values.username}
                  onChange={ev => this.onInputChange(ev,"username", setFieldValue)}
                  className={
                    errors.username && touched.username
                      ? "form-element username error"
                      : "form-element username"
                  }
                />
                <InputText
                  type="password"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={ev => this.onInputChange(ev,"password", setFieldValue)}
                  className={
                    errors.password && touched.password
                      ? "form-element password error"
                      : "form-element password"
                  }
                />
                <Link href="/forgetPassword">
                  <a>Şifremi unuttum</a>
                </Link>

                <div className={this.state.recaptchaClass}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    onChange={this.onChangeRecaptcha}
                    sitekey="6LcAe7QUAAAAALCSJQT6_fHFvYRzFsYrPtxZ5Mph"
                  />
                </div>

                <button type="submit" className="btn-submit">Giriş Yap</button>
              </Form>
            )}
        </Formik>

      </>
    )
  }
}


export default LoginForm;