import React from 'react'
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Button, Form, Input} from "antd";
import axios from "axios";
import swal from 'sweetalert';
const initialState = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    gender: '',
}
 function Edit(props) {
    const[state,setState]=useState(initialState)
    const handleInput = (e) => {
        console.log(e.target)
        setState({...state,[e.target.name]:e.target.value})
    }
    const [form]= Form.useForm()
    const {id} = useParams();
    useEffect(()=>{
        try{
        const user_id=id;
        console.log(user_id);
        axios.get(`api/edit-user/${user_id}`).then(res=>{
            console.log(res);
            setState(res.data.user);
            
        }); }catch (error){
            console.log(error)
        }
    },[id]);
    useEffect(()=>{
        form.setFieldsValue({
            name:state.name,
            email:state.email,
            password:state.password,
            phone_number:state.phone_number,
            address:state.address,
            gender:state.gender,
        })
    },[state])
    const onFinish = async (e) => {
        //e.preventDefault();
        const user_id=id;
        const data = {
            name: state.name,
            email:state.email,
            password:state.password,
            phone_number:state.phone_number,
            address:state.address,
            gender:state.gender,
        };
        axios.put(`/api/update-user/${user_id}`, data).then(res=>{
                console.log(res); 
        });
    }
    return (
        <div className="View">
        <div class="d-flex flex-column">
     <div className="block contactBlock">
       <div className="container-fluid">
         <div className="titleHolder"
      style={{margin:'60px'}}>
    <h1>Edit User's information</h1>  
                <Form
                name="basic"
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
                form={form} >
                    <Form.Item label="Name" name="name">
                        <Input type="text" placeholder="Name" name="name" className="form-control" value={state.name} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="text" placeholder="Email" name="email" className="form-control" value={state.email} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="text" placeholder="Password" name="password" className="form-control" value={state.password} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item label="Phone_number" name="phone_number">
                        <Input type="text" placeholder="Phone_number" name="phone_number" className="form-control" value={state.phone_number} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input type="text" placeholder="Address" name="address" className="form-control" value={state.address} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                        <Input type="text" placeholder="gender" name="gender" className="form-control" value={state.gender} onChange={handleInput} ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" value="insert" className="btn btn-primary mt-5">Update</Button>
                    </Form.Item>
                </Form>
                </div>      
            </div>
          </div>
        </div>
     </div>
    );

}

export default Edit;