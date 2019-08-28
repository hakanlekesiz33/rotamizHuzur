import React, { Component } from 'react';
const axios = require('axios');
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaRef = React.createRef();
import InputSelect from '../Inputs/InputSelect'

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import MaskedInput from "react-text-mask";
import userNameMask from '../Masks/userNameMask'
import phoneNumberMask from '../Masks/phoneNumberMask'
import DatePicker from "react-datepicker";
import "../../../styles/react-datepicker.scss"
import "../../../styles/ReactCrop.scss"

import InputText from '../Inputs/InputText'
import RadioButtonsGroup from '../Inputs/RadioButtonsGroup'
import InputTextArea from '../Inputs/InputTextArea'
import ReactCrop from "react-image-crop";
import { timingSafeEqual } from 'crypto';




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
  .trim()
  .matches(/^[a-zA-Z.-]+$/, 'Is not in correct format')
  .required('Required'),
  password: Yup.string()
    .required('Required'),
    Gender: Yup.string().required("Zorunlu Alan"),
});



class RegisterForm extends Component {
  state = {
    recaptchaClass: "recaptchaClass",
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 /  1
    },
    blobFile:''
  };

  
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      console.log(this.state.croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        var file = new File([blob], "name");
        this.setState({...this.state,blobFile:file});
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  onChangeRecaptcha = values => {
    if (values) {
      this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
    }
  }
  render() {

    const { crop, croppedImageUrl, src } = this.state;

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
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
        debugger;
        console.log(this.state.blobFile)

            console.log(values);
            console.log(values.BirthDate.toISOString());
            // if (!recaptchaRef.current.getValue()) {
            //   console.log("recaptchaClass error");
            //   this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
            //   return; //recaptha dolu değilse formu submit etmeyecek
            // }
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
                bodyFormData.append('Image', this.state.blobFile);
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
                <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        )}

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