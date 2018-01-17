import React from 'react';
import validator from 'validator';
import classNames from 'classnames';
import style from '../../public/css/style.css';

const validatorRule = {
    required: (value, props) => {
        if (validator.isEmpty(value)) {
            return <h6 className='text-danger small mt-1'><span className={style.capitalize}>{props.name}</span> tidak boleh kosong</h6>
        }
    },

    email: (value, props) => {
        if (!validator.isEmail(value)) {
            return <h6 className='text-danger small mt-1'><span className={style.capitalize}>{props.name}</span> tidak valid</h6>
        }
    },
    
    password: (value, props) => {
        if (value.trim().length < 7) {
            return <h6 className='text-danger small mt-1'><span className={style.capitalize}>{props.name}</span> setidaknya harus 8 karakter</h6>
        }
    },

    passwordConf: (value, props, components) => {
        const passwordValue = components.password[0].value;
        if (!validator.equals(value, passwordValue)) {
            return <h6 className='text-danger small mt-1'><span className={style.capitalize}>{props.name}</span> tidak sama</h6>
        }
    },

    username: (value, props) => {
        if (!validator.isAlphanumeric(value)) {
            return <h6 className='text-danger small mt-1'><span className={style.capitalize}>{props.name}</span> harus alphanumerik</h6>
        }
    }
};

export default validatorRule;