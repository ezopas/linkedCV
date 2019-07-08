import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, serFormData] = useState({
        email: '',
        password: ''
    });

    const  {email, password} = formData;

    const onChange = e => formData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('succses');
    };

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Login</h1>
                <p className="lead"><i className="fas fa-user"></i> Login Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password" name="password" value={password} onChange={e => onChange(e)}
                            minLength="6"
                            required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </section>
        </Fragment>
    )
};

export default Login;