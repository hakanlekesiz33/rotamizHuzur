import React, { Component } from 'react';
import '../styles/contact.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const axios = require('axios');
const recaptchaRef = React.createRef();

import { connect } from 'react-redux';
import initsStore from '../store/store';


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
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
            className="img-thumbnail mt-2"
            height={200}
            width={200} />);
    }
}


class Contact extends Component {

    constructor() {
        super();
  
        state = {
            recaptchaClass: "recaptchaClass"
        };
  
     };

 
   
    onChange =  values => {
        if (values) {
            console.log("onchange .......");
            this.setState({...this.state, recaptchaClass: "recaptchaClass" });
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
                                    file: ''

                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    if (!recaptchaRef.current.getValue()) {
                                        this.setState({...this.state, recaptchaClass: "recaptchaClass error" });
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
                                {({ errors, touched, values, handleSubmit, setFieldValue }) => (
                                    <Form encType="multipart/form-data">
                                        {errors.name && touched.name ? (
                                            <Field className="form-control errorName" type="text" placeholder="Your Name" name="name" />
                                        ) : <Field className="form-control" type="text" placeholder="Your Name" name="name" />}

                                        {errors.email && touched.email ? (
                                            <Field className="form-control errorEmail" type="text" placeholder="Your Name" name="email" />
                                        ) : <Field className="form-control" type="text" placeholder="Your Name" name="email" />}
                                        <Field component="textarea" className="form-control-lg" rows="5" placeholder="Type Comment" name="message" />
                                        <label>Dosya Yükleyiniz</label>
                                        <input id="file" name="file" type="file" onChange={(event) => {
                                            setFieldValue("file", event.currentTarget.files[0]);
                                        }} className="form-control" />
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