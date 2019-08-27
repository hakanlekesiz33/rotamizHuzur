import React, { Component } from 'react';
const axios = require('axios');
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaRef = React.createRef();
import InputSelect from '../Inputs/InputSelect'

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import MaskedInput from "react-text-mask";
import phoneNumberMask from '../Masks/phoneNumberMask'
import DatePicker from "react-datepicker";
import "../../../styles/react-datepicker.scss"
import InputText from '../Inputs/InputText'
import RadioButtonsGroup from '../Inputs/RadioButtonsGroup'
import InputTextArea from '../Inputs/InputTextArea'


const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};



const SignupSchema = Yup.object().shape({
  UserName: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
    Gender: Yup.string().required("Zorunlu Alan"),
});



class RegisterForm extends Component {
  state = {
    recaptchaClass: "recaptchaClass"
  };

  onChangeRecaptcha = values => {
    if (values) {
      this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
    }
  }
  render() {

    return (
      <>
        <Formik
          initialValues={{
            UserName: '',
            password: '',
            Name: '',
            SurName: '',
            Phone: '',
            Gender: '',
            BirthDate: new Date(),
            Address: '',
            City: '0',
            Country: '0',
            PostaCode: '',
            Image: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {

            console.log(values);
            console.log(values.BirthDate.toISOString());
            if (!recaptchaRef.current.getValue()) {
              console.log("recaptchaClass error");
              this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
              return; //recaptha dolu değilse formu submit etmeyecek
            }
            const user = {
              username: "hakan",
              password: "123456"
            }

            axios.post('https://localhost:44302/api/token/token', user
            ).then(function (response) {
              return response.data.token;
            })
              .then(function (token) {
                const registerForm =
                {
                  UserName: values.UserName,
                  password: values.password,
                  Name: values.Name,
                  SurName: values.SurName,
                  Phone: values.Phone,
                  Gender: values.Gender,
                  BirthDate: values.BirthDate,
                  Address: values.Address,
                  City: values.City,
                  Country: values.Country,
                  PostaCode: values.PostaCode
                }
                var bodyFormData = new FormData();
                bodyFormData.append('Image', values.Image);
                bodyFormData.append('registerForm', JSON.stringify(registerForm));

                const headers = {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'bearer ' + token
                }
                axios.post('https://localhost:44302/api/Auth/register', bodyFormData, {
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

                <InputText
                  type="text"
                  placeholder="Kullanıcı Adı"
                  name="UserName"
                  className={
                    errors.UserName && touched.UserName
                      ? "form-element username error"
                      : "form-element username"
                  }
                />
                <InputText
                  type="password"
                  placeholder="password"
                  name="password"
                  className={
                    errors.password && touched.password
                      ? "form-element password error"
                      : "form-element password"
                  }
                />
                <InputText
                  type="text"
                  placeholder="Adınız"
                  name="Name"
                  className={
                    errors.Name && touched.Name
                      ? "form-element name error"
                      : "form-element name"
                  }
                />
                <InputText
                  type="text"
                  placeholder="Soy Adınız"
                  name="SurName"
                  className={
                    errors.SurName && touched.SurName
                      ? "form-element surName error"
                      : "form-element surName"
                  }
                />

                <Field
                  name="Phone"
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={phoneNumberMask}
                      id="Phone"
                      placeholder="Telefon Numarası"
                      type="text"
                      className={
                        errors.Phone && touched.Phone
                          ? "form-element phone error"
                          : "form-element phone"
                      }
                    />
                  )}
                />

                <h5>Doğum Tarihiniz</h5>
                <DatePickerField
                  name="BirthDate"
                  value={values.BirthDate}
                  onChange={setFieldValue}
                  className="form-element birthDate"
                  dateFormat="Pp"
                />


                <h5>Cinsiyet</h5>
                <RadioButtonsGroup
                  id="Gender"
                  label="Lütfen Birini Seçiniz"
                  value={values.Gender}
                  error={errors.Gender}
                  touched={touched.Gender}
                  radioButtons={[
                    { name: 'Gender', id: 'male', label: 'Erkek' },
                    { name: 'Gender', id: 'female', label: 'Kadın' }
                  ]}
                  className={
                    errors.Gender && touched.Gender
                      ? "form-element gender error"
                      : "form-element gender"
                  }
                />

                <InputTextArea
                  id="Address"
                  name="Address"
                  className="form-element address"
                  rows="5"
                  placeholder="Adresiniz"
                />
                <h5>Şehir Seçiniz</h5>
                <InputSelect
                  id="City"
                  name="City"
                  options={[
                    { name: 'Şehir Seçiniz', value: '0' },
                    { name: 'İstanbul', value: 'İstanbul' },
                    { name: 'Mersin', value: 'Mersin' },
                    { name: 'İzmir', value: 'İzmir' }
                  ]}
                />
                <h5>Ülke Seçiniz</h5>
                <InputSelect
                  id="Country"
                  name="Country"
                  options={[
                    { name: 'Ülke Seçiniz', value: '0' },
                    { name: 'Türkiye', value: 'Türkiye' },
                    { name: 'Almanya', value: 'Almanya' },
                    { name: 'ABD', value: 'ABD' }
                  ]}
                />

                <InputText
                  type="text"
                  placeholder="Posta Kodu"
                  name="PostaCode"
                  className={
                    errors.PostaCode && touched.PostaCode
                      ? "form-element postaCode error"
                      : "form-element postaCode"
                  }
                />
                <label>Profil Resmi Yükleyiniz</label>
                <input id="Image" name="Image" type="file" onChange={(event) => {
                  setFieldValue("Image", event.currentTarget.files[0]);
                }} className="form-element image" />

                <div className={this.state.recaptchaClass}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    onChange={this.onChangeRecaptcha}
                    sitekey="6LcAe7QUAAAAALCSJQT6_fHFvYRzFsYrPtxZ5Mph"
                  />
                </div>

                <button type="submit" className="btn-submit">Üye Ol</button>
              </Form>
            )}
        </Formik>

      </>
    )
  }
}


export default RegisterForm;