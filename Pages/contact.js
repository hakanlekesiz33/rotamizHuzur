import Link from 'next/link'
import '../styles/contact.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const axios = require('axios');

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});


function Contact() {
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
                        <div className="form">
                            <h3>Send Your Message</h3>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                }}

                               
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                   
                                    const user = {
                                        username:"hakan",
                                        password:"123456"
                                    }

                                        axios.post('https://localhost:44329/api/token/token',user
                                            ).then(function (response) {
                                                
                                              return response.data.token;

                                            })
                                            .then(function(token) {

                                                const headers = {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'bearer ' + token 
                                                  }
                                             
                                                  
                                                  debugger;
                                                axios.post('https://localhost:44329/api/values', values, {
                                                    headers: headers
                                                  }).then(function(res){
                                                    console.log(res)

                                                })
                                            })
                                            .catch(function (error) {
                                                
                                            console.log(error.config);
                                        });

                                    }}

                            >
                             {({ errors, touched }) => (
                             <Form>
                                <Field  className="form-control" type="text" placeholder="Your Name" name="firstName"  />
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                                <Field   className="form-control" type="text" placeholder="Your Name" name="lastName"  />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}
                                <Field component="textarea" className="form-control-lg" rows="5"  placeholder="Type Comment" name="email"/>
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                <button type="submit" className="btn-submit">Send Message</button>
                                </Form>
                                )}
                                </Formik>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact