import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import '../styles/Login.scss';
import '../styles/formElements.scss';
import LoginForm from '../components/Forms/LoginForm';

class Login extends Component {
    render() {
        return (
            <div id='login'>
                <div className="gridWrapper">
                    <div className="row">
                        <div className="topRow">
                            <h1>Giriş Yap</h1>
                            <p>Orci pellentesque ullamcorper erat, suscipit viverra non sit venenatis ipsum volutpat. Condimentum nunc, dolor dignissim eros vestibulum, fusce gravida quis recusandae, vehic</p>
                        </div>
                        <div className="loginWrapper">
                           <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(Login);