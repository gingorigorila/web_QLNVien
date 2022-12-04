import React from 'react'
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Button, Form, Input, Layout} from "antd";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const initialState = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    gender: '',
}
 function View(props) {
    const[state,setState]=useState(initialState)
    // const handleInput = (e) => {
    //     console.log(e.target)
    //     setState({...state,[e.target.name]:e.target.value})
    // }
    const navigate = useNavigate()
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
    // const onFinish = async (e) => {
    //     //e.preventDefault();
    //     const user_id=id;
    //     const data = {
    //         name: state.name,
    //         email:state.email,
    //         password:state.password,
    //         phone_number:state.phone_number,
    //         address:state.address,
    //         gender:state.gender,
    //     };
    //     axios.put(`/api/update-user/${user_id}`, data).then(res=>{
    //             console.log(res); 
    //     });
    // }
    const handleBackButton = () => {
        navigate(`/`)
      }

    return (
        
        <div className="View">
            <div class="d-flex flex-column">
         <div className="block contactBlock">
           <div className="container-fluid">
             <div className="titleHolder"
          style={{margin:'60px'}}>
        <h1>User's information</h1>  
           
            {/* <Button
              size="large"
              type="primary"
              className="ml-3 no-border"
              htmlType="button"
              enabled="true"
              onClick={handleBackButton}
              style={{ fontSize: '20px'}}
            >
              Back
            </Button> */}
                <Form 
                name="basic"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 5,
                }}
                style={{
                    marginTop:"55px"
                }}
                form={form}  >
                    <Form.Item label="Name" name="name">
                    <p>{ state.name }</p>     
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                    <p>{ state.email }</p>
                    </Form.Item>

                    <Form.Item label="Phone_number" name="phone_number">
                        <p>{ state.phone_number}</p>
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                        <p>{ state.address}</p>
                    </Form.Item>
                    
                    <Form.Item 
                    type="primary"
                    className="mb-5"
                    htmlType="button"
                    enabled
                    onClick={handleBackButton}
                    wrapperCol={{
                    offset: 1,
                    span: 10,
                   }}
                 >
                   <Button type="primary" htmlType="submit">
                     Back
                 </Button>
                </Form.Item>
                </Form>
           
        </div>      
        </div>
              </div>
            </div>
        </div>
    );

}

export default View;