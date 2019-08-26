import React, { Component } from 'react';
import { connect } from 'react-redux';
import initsStore from '../store/store';
import '../styles/Register.scss';
import '../styles/formElements.scss';
import RegisterForm from '../components/Forms/RegisterForm';
class Register extends Component {
    render() {
        return (
            <div id='register'>
                <div className="gridWrapper">
                    <div className="row">
                        <div className="topRow">
                            <h1>Üye Ol</h1>
                            <p>Orci pellentesque ullamcorper erat, suscipit viverra non sit venenatis ipsum volutpat. Condimentum nunc, dolor dignissim eros vestibulum, fusce gravida quis recusandae, vehic</p>
                        </div>
                        <div className="registerWrapper">
                           <RegisterForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(initsStore)(Register);