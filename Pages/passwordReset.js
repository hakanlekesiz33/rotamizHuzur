import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import '../styles/Login.scss';
import '../styles/formElements.scss';
import ResetForm from '../components/Forms/ResetForm';

class passwordReset extends Component {
    render() {
        return (
            <div id='login'>
                <div className="gridWrapper">
                    <div className="row">
                        <div className="topRow">
                            <h1>Parolamı Yenileme</h1>
                            <p>Lütfen size gönderilen kodu girip yeni parola belirleyiniz</p>
                        </div>
                        <div className="loginWrapper">
                           <ResetForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(passwordReset);