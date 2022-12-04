import React, {Component} from 'react'
import { useState } from 'react'
import {Table,Select, Popconfirm, Button, Space, Form, Input, notification} from "antd";
import axios from "axios";
import { useNavigate,NavLink } from 'react-router-dom';



const initialState = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    gender: '',
}
 function Add() {
    const [form] = Form.useForm()
    const[state,setState]=useState(initialState)
    const navigate = useNavigate();

    const handleInput = (e) => {
        console.log(e.target)
        setState({...state,[e.target.name]:e.target.value})
    }
    
    const onFinish = async (e) => {
        //e.preventDefault();
        const res = await axios.post('http://localhost:8000/api/add-user', state);
        if(res.request.status === 200) {
            form.resetFields()
            setState('')
            openNotification(
                'success',
                'Bạn đã thêm user thành công'
            )
            navigate('/');
        }
    }
    const validateMessages = {
        required: 'Hàng này bắt buộc.',
        types: {
          email: '',
        },
        email: {
          message: '${message}',
        },
      }

      const openNotification = (type, message, description) => {
        notification[type]({
          message,
          description,
          duration: 3,
        })
      }
    
    return (
        <div className="View">
        <div class="d-flex flex-column">
     <div className="block contactBlock">
       <div className="container-fluid">
         <div className="titleHolder"
      style={{margin:'60px'}}>
    <h1>Add User's information</h1>  
        <div className="container mx-auto flex-1 justify-center px-4 pb-20">
            <header className="flex justify-center">
                <Form
                    form={form}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    size="large"
                    colon={false}
                    className="add-user-form"
                    labelAlign="right"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <Input type="text" placeholder="Type your Name" name="name" className="form-control" value={state.name} onChange={handleInput}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Địa chỉ email không hợp lệ!',
                                required: true
                            }
                        ]}>
                        <Input type="email" placeholder="Type your Email" name="email" className="form-control" value={state.email} onChange={handleInput}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <Input type="password" placeholder="Type your Password" name="password" className="form-control" value={state.password} onChange={handleInput}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Phone_number"
                        name="phone_number"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input type="text" placeholder="Type your Phone_number" name="phone_number" className="form-control" value={state.phone_number} onChange={handleInput}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <Input type="text" placeholder="Type your Address" name="address" className="form-control" value={state.address} onChange={handleInput}></Input>
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                        <Select type="text" placeholder="gender" name="gender" className="form-control" value={state.gender} onChange={handleInput}>
                            <Select.Option value="Male"></Select.Option>
                            <Select.Option value="Female"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" value="insert" className="btn btn-primary mt-5">Add</Button>
                    </Form.Item>
                </Form>
            </header>
        </div>
        </div>
        </div>      
            </div>
          </div>
        </div>
    )
}

export default Add;