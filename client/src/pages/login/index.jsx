import React, { useState } from 'react';
import Header from '../../layouts/frontend/Header';
import 'antd/dist/antd.css';

import { Button, Checkbox, Form, Input, Layout } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, NavLink } from 'react-router-dom';
//import './styles.scss'

const initialState = {
    email: '',
    password: '',
}
function Login(){
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState(initialState)
    const handleInput = (e) =>{
        console.log(e.target)
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const onFinish = (e) => {
       // e.preventDefault();console.log(e.target)
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('api/login', data).then(res => {
             if(res.data.status === 200)
             {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                navigate('/');
             }
             else if(res.data.status === 401)
             {
                swal("Warning", res.data.message, "warning");
             }
             else
             {
                setLogin({...loginInput, error_list: res.data.validation_errors });
             }
        });
      });
    }

    return(
        <div className="Login">
            <div className="block contactBlock">
              <div className="container-fluid">
                  <div className="titleHolder"
                  style={{margin:'60px'}}>
                <h1>Login form</h1>  
            <Form
            name="basic"
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 10,
            }}
            style={{
                margin:'55px 0'
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item name="email" label="Email">
                <Input placeholder="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control"/>
            </Form.Item>
            <Form.Item name="password" label="password">
                <Input placeholder="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control"/>
            </Form.Item>
            <Form.Item 
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
               <Button type="primary" htmlType="submit">
                   Login
               </Button>
              </Form.Item>
              </Form>
              </div>
              </div>
            </div>
        </div>
    );
}


export default Login;