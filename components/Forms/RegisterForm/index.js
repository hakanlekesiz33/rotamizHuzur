import React, { Component } from 'react';
const axios = require('axios');
const recaptchaRef = React.createRef();
import ReCAPTCHA from "react-google-recaptcha";

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import MaskedInput from "react-text-mask";
import phoneNumberMask from '../Masks/phoneNumberMask'
import "../../../styles/react-datepicker.scss"
import "../../../styles/ReactCrop.scss"

import InputText from '../Inputs/InputText'
import InputTextArea from '../Inputs/InputTextArea'
import ReactCrop from "react-image-crop";
import { timingSafeEqual } from 'crypto';

import InputSelect from '../Inputs/InputSelect'
import InputSelect2 from '../Inputs/InputSelect2'
import DatePicker from '../Inputs/DatePicker'
import RadioButtonsGroup from '../Inputs/RadioButtonsGroup'

const allTownOptions = [
  { value: 'Bakırköy', label: 'Bakırköy', city: 'İstanbul' },
  { value: 'Maltepe', label: 'Maltepe', city: 'İstanbul' },
  { value: 'Gaziemir', label: 'Gaziemir', city: 'İzmir' },
  { value: 'Konak', label: 'Konak', city: 'İzmir' },
  { value: 'Anamur', label: 'Anamur', city: 'Mersin' },
  { value: 'Tarsus', label: 'Tarsus', city: 'Mersin' }
];

const SignupSchema = Yup.object().shape({
  UserName: Yup.string()
    .trim()
    .required('Required'),
    email: Yup.string()
    .email('Invalid email')
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
      aspect: 1 / 1
    },
    blobFile: [],
    CountryCode: null,
    City: null,
    Country: null,
    Town: null,
    townOptions: [],
    townDisabled: true
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
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        var files = [];
        var file = new File([blob], "name.jpg");
        files.push(file);
        this.setState({ ...this.state, blobFile: files });
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  onChangeRecaptcha = values => {
    if (values) {
      this.setState({ ...this.state, recaptchaClass: "recaptchaClass" });
    }
  }

  select2HandleChangeCity = City => {
    const updatedTownOptions = allTownOptions.filter((town) => City.value == town.city);
    this.setState({ ...this.state, City: City, townDisabled: false, townOptions: updatedTownOptions });
  };

  select2HandleChangeCountry = Country => {
    this.setState({ ...this.state, Country: Country });
  };

  select2HandleChangeCountryCode = CountryCode => {
    this.setState({ ...this.state, CountryCode: CountryCode });
  };

  select2HandleChangeTown = Town => {
    this.setState({ ...this.state, Town: Town });
  };

  onInputChange = (e, inputName, setFieldValue) => {
    setFieldValue(inputName, e.target.value, false)
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
            PostaCode: '',
            Image: '',
            email: ''
          }}

          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(this.state.blobFile[0]);
            const selectedCountry = this.state.Country != null ? this.state.Country.value : null;
            const selectedCity = this.state.City != null ? this.state.City.value : null;
            const selectedTown = this.state.Town != null ? this.state.Town.value : null;
            const Image = this.state.blobFile[0] != null ? this.state.blobFile[0] : null;
            debugger;

            if (!recaptchaRef.current.getValue()) {
              console.log("recaptchaClass error");
              this.setState({ ...this.state, recaptchaClass: "recaptchaClass error" });
              return; //recaptha dolu değilse formu submit etmeyecek
            }
            const user = {
              username: "hakan",
              password: "123456"
            }

            axios.post('http://reprep.api.feux.digital/api/token/token', user
            ).then(function (response) {
              return response.data.token;
            })
              .then(function (token) {
                const registerForm =
                {
                  UserName: values.UserName,
                  password: values.password,
                  Email: values.email,
                  Name: values.Name,
                  SurName: values.SurName,
                  Phone: values.Phone,
                  Gender: values.Gender,
                  BirthDate: values.BirthDate,
                  Address: values.Address,
                  City: selectedCity,
                  Country: selectedCountry,
                  Town: selectedTown,
                  PostaCode: values.PostaCode
                }

                var bodyFormData = new FormData();
                bodyFormData.append('Image', Image);
                bodyFormData.append('registerForm', JSON.stringify(registerForm));

                const headers = {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'bearer ' + token
                }
                axios.post('http://reprep.api.feux.digital/api/Auth/register', bodyFormData, {
                  headers: headers

                }).then(function (res) {
                  alert(res.data.status)
                })
              })
              .catch(function (error) {
                console.log(error.config);
              });

          }}

        >
          {({ errors,
            touched,
            values,
            handleSubmit,
            setFieldValue,
            setFieldTouched }) => (
              <Form encType="multipart/form-data">
                <InputText
                  type="text"
                  placeholder="Email Adresi"
                  name="email"
                  value={values.email}
                  onChange={ev => this.onInputChange(ev, "email", setFieldValue)}
                  className={
                    errors.email && touched.email
                      ? "form-control error"
                      : "form-control"
                  }
                />
                <InputText
                  type="text"
                  placeholder="Kullanıcı Adı"
                  name="UserName"
                  value={values.UserName}
                  onChange={ev => this.onInputChange(ev, "UserName", setFieldValue)}
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
                  value={values.password}
                  onChange={ev => this.onInputChange(ev, "password", setFieldValue)}
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
                  value={values.Name}
                  onChange={ev => this.onInputChange(ev, "Name", setFieldValue)}
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
                  value={values.SurName}
                  onChange={ev => this.onInputChange(ev, "SurName", setFieldValue)}
                  className={
                    errors.SurName && touched.SurName
                      ? "form-element surName error"
                      : "form-element surName"
                  }
                />

                <h5>Ülke Kodu Seçiniz</h5>
                <InputSelect2
                  name="CountryCode"
                  id="CountryCode"
                  value={this.state.CountryCode}
                  onChange={this.select2HandleChangeCountryCode}
                  options={[
                    { value: 'Türkiye +75', label: '+90 Türkiye' },
                    { value: 'Almanya +75', label: '+80 Almanya' },
                    { value: 'ABD +75', label: '+75 ABD' }
                  ]}
                  isMulti={false}
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
                <DatePicker
                  name="BirthDate"
                  value={values.BirthDate}
                  onChange={setFieldValue}
                  className="form-element birthDate"
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

                {/* <InputSelect
                  id="City"
                  name="City"
                  options={[
                    { name: 'Şehir Seçiniz', value: '0' },
                    { name: 'İstanbul', value: 'İstanbul' },
                    { name: 'Mersin', value: 'Mersin' },
                    { name: 'İzmir', value: 'İzmir' }
                  ]}
                /> */}

                <h5>Ülke Seçiniz</h5>
                <InputSelect2
                  name="Country"
                  id="Country"
                  value={this.state.Country}
                  onChange={this.select2HandleChangeCountry}
                  options={[
                    { value: 'Türkiye', label: 'Türkiye' },
                    { value: 'Almanya', label: 'Almanya' },
                    { value: 'ABD', label: 'ABD' }
                  ]}
                  isMulti={false}
                />

                <h5>Şehir Seçiniz</h5>
                <InputSelect2
                  name="City"
                  id="City"
                  value={this.state.City}
                  onChange={this.select2HandleChangeCity}
                  options={[
                    { value: 'İstanbul', label: 'İstanbul' },
                    { value: 'Mersin', label: 'Mersin' },
                    { value: 'İzmir', label: 'İzmir' }
                  ]}
                  isMulti={false}
                />

                <h5>İlçe Seçiniz</h5>
                <InputSelect2
                  name="Town"
                  id="Town"
                  value={this.state.Town}
                  onChange={this.select2HandleChangeTown}
                  options={this.state.townOptions}
                  isMulti={false}
                  isDisabled={this.state.townDisabled}
                />

                <InputText
                  type="text"
                  placeholder="Posta Kodu"
                  name="PostaCode"
                  value={values.PostaCode}
                  onChange={ev => this.onInputChange(ev, "PostaCode", setFieldValue)}
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