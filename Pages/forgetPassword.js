import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import '../styles/Login.scss';
import '../styles/formElements.scss';
import ForgotPassword from '../components/Forms/ForgotPassword';

class forgetPassword extends Component {
    render() {
        return (
            <div id='login'>
                <div className="gridWrapper">
                    <div className="row">
                        <div className="topRow">
                            <h1>Parolamı Unuttum</h1>
                            <p>Parolanızı sıfırlamak için lütfen email adresinizi giriniz</p>
                        </div>
                        <div className="loginWrapper">
                           <ForgotPassword/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(forgetPassword);