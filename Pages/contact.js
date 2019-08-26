import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import '../styles/contact.scss';
import '../styles/formElements.scss';
import ContactForm from '../components/Forms/ContactForm'

class Contact extends Component {
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
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(Contact);