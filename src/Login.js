import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import classNames from 'classnames';
import style from '../public/css/style.css';
import img from '../public/img/managix-logo.png';
import url from './constants/url';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            isLogin: true,
            error: {
                status: false,
                msg: '',
            },            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    async doLogin(username, password) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Api-Key': url.PROD.API_KEY,
            },
        };

        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        return await axios.post(`${url.PROD.URL}/auth`, data, config);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const resLogin = await this.doLogin(username, password);
        
        let errorState = { 
            ...this.state.error, 
            status: false, 
            msg: '', 
        };

        if (resLogin.data.error !== 0) {
            errorState = { 
                ...this.state.error, 
                status: true, 
                msg: resLogin.data.message, 
            };
        }
       
        this.setState({ error: errorState });
    }

    handleToggle(e) {
        this.setState({ isLogin: !this.state.isLogin });
    }

    render() {
        const isLogin = this.state.isLogin;
        let formEl = (
            <form method='POST' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        className={classNames('form-control', style.input)}
                        placeholder='Username or E-Mail Address'
                        onChange={this.handleChange}
                        name='username'
                        required />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        className={classNames('form-control', style.input)}
                        placeholder='Password'
                        onChange={this.handleChange}
                        name='password'
                        required />
                </div>
                <button
                    type="submit"
                    className={style['login-btn']}>
                    Login
                </button>
                <div
                    className={classNames('float-right', 'mt-3', style['link-toggle'])}
                    onClick={this.handleToggle}>
                    Forgot Password
                </div>
            </form>
        );

        if (!isLogin) {
            formEl = (
                <form method='POST' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className={classNames('form-control', style.input)}
                            placeholder='E-Mail Address'
                            onChange={this.handleChange}
                            name='username'
                            required />
                    </div>
                    <button
                        type="submit"
                        className={style['login-btn']}>
                        Recover Password
                    </button>
                    <div 
                        className={classNames('float-right', 'mt-3', style['link-toggle'])}
                        onClick={this.handleToggle}>
                        I Have Password
                    </div>
                </form>
            );
        }

        return (
            <div className={style['page-login']}>
                <div className={style['login-box']}>
                    <p align='center' style={{ marginBottom: '30px' }}>
                        <img src={img} height='25' />
                    </p>
                    {this.state.error.status &&
                        <p align='center' className='text-danger'>{this.state.error.msg}</p>
                    }
                    {formEl}                    
                    <div className='clearfix' />
                </div>
            </div>
        );
    }
}

export default Login;