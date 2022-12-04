import { Button, Checkbox, Form, Input, Select } from 'antd';
import React, {useState,useEffect} from 'react';
import Navbar from '../../layouts/frontend/Header';
import swal from 'sweetalert';
import { useNavigate,NavLink } from 'react-router-dom';
import axios from 'axios';
import { Typography } from 'antd';
const initialState = {
    name: '',
    email: '',
    password: '',
}
function Register(){
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState(initialState)
    const handleInput = (e) =>{
        console.log(e.target)
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value });
    }
    useEffect(()=>{
        if(localStorage.getItem('auth_name'))
        {
          navigate('/');
        }
    },[])
    const onFinish = (e) => {
        //e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response =>{
            axios.post('/api/register', data).then(res =>{
                if(res.data.status === 200)
                {
                   localStorage.setItem('auth_token', res.data.token);
                   localStorage.setItem('auth_name', res.data.username);
                   swal("Success", res.data.message,"success");
                   navigate('/');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors}); 
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
        <h1>Register form</h1>  
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
            <Form.Item name="name" label="Name" >
                <Input placeholder="name" name="name" onChange={handleInput} value={registerInput.name} className="form-control"/>
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input placeholder="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control"/>
            </Form.Item>
            <Form.Item name="password" label="Password">
                <Input placeholder="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control"/>
            </Form.Item>
            <Form.Item 
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
               <Button type="primary" htmlType="submit">
                   Register
               </Button>
            </Form.Item>
            </Form>
            </div>
              </div>
            </div>
        </div>
 );
}
export default Register;
