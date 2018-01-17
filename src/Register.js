import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import classNames from 'classnames';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import style from '../public/css/style.css';
import img from '../public/img/managix-logo.png';
import url from './constants/url';
import ruleValidator from './helpers/validator';

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            firstname: '',
            lastname: '',
            error: {
                status: false,
                msg: '',
            },            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async doRegister(regData) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': url.DEV.API_KEY,
            },
        };

        const data = {
            email: regData.email,
            username: regData.username,
            password: regData.password,
            first_name: regData.firstname,
            last_name: regData.lastname,
        };

        return await axios.post(`${url.DEV.URL}/user/registration`, JSON.stringify(data), config);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const stateData = {...this.state};

        const regData = {
            email: stateData.email,
            username: stateData.username,
            password: stateData.password,
            firstname: stateData.firstname,
            lastname: stateData.lastname,
        };

        const resReg = await this.doRegister(regData);
        
        let errorState = { 
            ...this.state.error, 
            status: false, 
            msg: '', 
        };

        if (resReg.data.error !== 0) {
            errorState = { 
                ...this.state.error, 
                status: true, 
                msg: resReg.data.message,
            };
        }
       
        this.setState({ error: errorState });
    }

    render() {
        return (
            <div className={style['page-login']}>
                <div className={style['login-box']}>
                    <p align='center' style={{ marginBottom: '30px' }}>
                        <img src={img} height='25' />
                    </p>
                    {this.state.error.status &&
                        <p align='center' className='text-danger'>{this.state.error.msg}</p>
                    }
                    <Form onSubmit={this.handleSubmit} noValidate>
                        <div className='form-group'>
                            <Input
                                type='email'
                                className={classNames('form-control', style.input)}
                                placeholder='Email'
                                onChange={this.handleChange}
                                name='email'
                                validations={[
                                    ruleValidator.required, 
                                    ruleValidator.email, 
                                ]} />
                        </div>
                        <div className='form-group'>
                            <Input
                                type='text'
                                className={classNames('form-control', style.input)}
                                placeholder='Username'
                                onChange={this.handleChange}
                                name='username'
                                validations={[
                                    ruleValidator.required,
                                    ruleValidator.username
                                ]} />
                        </div>
                        <div className='form-group'>
                            <Input
                                type='password'
                                className={classNames('form-control', style.input)}
                                placeholder='Password'
                                onChange={this.handleChange}
                                name='password'
                                validations={[
                                    ruleValidator.required,
                                    ruleValidator.password
                                ]} />
                        </div>
                        <div className='form-group'>
                            <Input
                                type='password'
                                className={classNames('form-control', style.input)}
                                placeholder='Pasword Confirmation'
                                onChange={this.handleChange}
                                name='passwordConfirmation'
                                validations={[
                                    ruleValidator.required,
                                    ruleValidator.passwordConf
                                ]} />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                className={classNames('form-control', style.input)}
                                placeholder='Firstname'
                                onChange={this.handleChange}
                                name='firstname'
                                validations={[
                                    ruleValidator.required
                                ]} /> />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                className={classNames('form-control', style.input)}
                                placeholder='Lastname'
                                onChange={this.handleChange}
                                name='lastname'
                                validations={[
                                    ruleValidator.required
                                ]} /> />
                        </div>
                        <Button
                            type="submit"
                            className={style['login-btn']}>
                            Register
                        </Button>
                    </Form>                
                    <div className='clearfix' />
                </div>
            </div>
        );
    }
}

export default Register;