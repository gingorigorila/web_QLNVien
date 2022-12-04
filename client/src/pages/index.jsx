import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Table, Button, Space, Form, Input, Tooltip,Select, Modal,notification } from "antd";
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons'
//import Link from 'next/link'
import {} from "lodash";

import Header from '../layouts/frontend/Header';
import {  deleteUser } from '../api/user-detail'
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';




function Users() {

const [loading, setLoading] = useState(false);
const [dataSource, setDataSource] = useState([]);
const [show, setShow] = useState(false)
const [filterData, setFilterData] = useState([])
const [isModalVisible, setIsModalVisible] = useState(false)
const {confirm} = Modal;
const [searchText, setSearchText] = useState("")
const [pagination, setPagination] = useState({
  position: ['bottomCenter'],
  current: 1,
  pageSize: 10,
  showSizeChanger: false,
})
const navigate = useNavigate()
const handleInput = (e) => {
  const result = dataSource.filter(
    (obj) => obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1,

  )
  setFilterData(result)
}
const handleClose = () => {
    setShow(false)
}
useEffect(() => {
    fetchRecords();
}, [])

const handleRow = (item) => ({
    onClick: () => {
        navigate(`/user/${item.id}`)
    },
})

const handleClick = (e) => {
  e.preventDefault()
  navigate('/add-user')
}

const handleEdit = (item) => {
    navigate(`edit-user/${item}`)
  }


const [id, setId] = useState()
const [isModalType, setIsModalType] = useState({
    delete: false,
    edit: false,
  })

  const handleOk = async () => {
    setIsModalVisible(false)
    try {
      if (isModalType.delete) {
        await deleteUser(id)
        setPagination((preState) => ({
          ...preState,
          current: 1,
        }))

        setId(null)
        openNotificationSuccess()
        fetchRecords()
        setIsModalType((preState) => ({ ...preState, delete: false }))
      }

      if (isModalType.edit) {
        setIsModalType((preState) => ({ ...preState, edit: false }))
        window.location.href = `/members/${id}/edit`
      }
    } catch (error) {
      // if (error.response.status === 404) {
      //   navigate('/404')
      // }
      console.log(error)
    }
  }
  
  const handleCancel = () => {
    setIsModalVisible(false)
    setIsModalType({ delete: false, edit: false })
  }

  const openNotificationSuccess = () => {
    notification.success({
      message: 'メンバを正常に削除されました',
      duration: 3,
    })
  }
  
  const showModal = (type) => {
    setIsModalVisible(true)
    let title
    if (type.edit) {
      title = 'Bạn có muốn sửa người dùng này không?'
    } else {
      title = 'Bạn có muốn xóa người dùng này không?'
    }
    Modal.confirm({
      centered: true,
      title,
      visible: isModalVisible,
      onOk() {
        handleOk()
      },
      onCancel() {
        handleCancel()
      },
      okText: 'はい',
      cancelText: 'いいえ',
    })
  }

// const deleteUser = (e, id) => {
//     setShow(true)
//     const thisClicked = e.currentTarget;
//     thisClicked.innerText = "Deleting";
    
//     axios.delete(`/api/delete-user/${id}`).then(res => {
//         if (res.data.status === 200) {
//             swal("Success", res.data.message, "success");
//             thisClicked.closest("tr").remove();
//         }
//         else if (res.data.status === 404) {
//             swal("Success", res.data.message, "success");
//             thisClicked.innerText = "Delete";
//         }
//     });
// }
// eslint-disable-next-line react/jsx-no-undef

const columns = [
    {
        key: "1",
        title: "ID",
        dataIndex: "id",
        render: (value, item) => (
            <div>{item.id}</div>
            
        )},
    {
        key: "2",
        title: "Name",
        dataIndex: "name",
        align: "center",
        render: (name, item) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <><div>{name}</div><a href={`/user/${item.id}`}></a></>
        ),
        onCell: handleRow,
    },
    {
        key: "3",
        title: "Email",
        dataIndex: "email",
        align: "center",
        render: (email, item) => (
            <div>{item.email}</div>
        ),
        onCell: handleRow,
    },
    {
        key: "4",
        title: "Phone_number",
        dataIndex: "phone_number",
        align: "center",
        render: (phone_number, item) => (
            <div>{phone_number}</div>
        ),
        onCell: handleRow,
    },
    {
        key: "5",
        title: "Address",
        dataIndex: "address",
        align: "center",
        render: (address, item) => (
            <div>{address}</div>
        ),
        onCell: handleRow,
    },

    {
        key: "6",
        title: "Gender",
        dataIndex: "gender",
        align: "center",
        render: (gender, item) => (
            <div>{gender}</div>
        ),
        onCell: handleRow,
    },
    {
        key: "7",
        title: "Action ",
        dataIndex: "action",
        align: "center",
        render: (_text, item) => (
            <Space size="middle">
          <EditTwoTone
            id={item.id}
            onClick={() => {
              handleEdit(item.id)
            }}
          />
            
            <DeleteTwoTone
            onClick={(e) => {
             // e.stopPropagation()
              setId(item.id)
              setIsModalType((preState) => ({
                ...preState,
                delete: true,
              }))
            }}
          />

          </Space>
        ),
    },
];
const fetchRecords = () => {
    fetch("http://localhost:8000/api/users ").then(
        (res) => {
            res.json().then((response) => {
                setDataSource(response.users);
                //console.log(response);
            });
        }
    );
};

useEffect(() => {
  if (!isModalType.add && !isModalType.delete && !isModalType.edit) {
    return
  }
  showModal(isModalType)
}, [isModalType])

const handleInputChange = (e) => {
  setSearchText(e.target.value);
  if(e.target.value === ""){
    fetchRecords();
  }
}

const globalSearch = (e) => {
  const result = dataSource.filter(
    (obj) => obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1,

  )
  setFilterData(result);
}
return (
    <div>
       <Header></Header>
        <div className="User">
            <header className="User-header">
            <div className="flex justify-end">
              <div>
                <div className="text-2xl flex items-center">
                  <Input
                    size="large"
                    className="no-border"
                    placeholder="Ten User"
                   // onChange={handleInput}
                   onChange={handleInputChange}
                    bordered
                    type="text"
                    value={searchText}
                    //prefix={<SearchOutlined />}
                  />
                  <Button onClick={globalSearch} type = "primary">
                      Search
                  </Button>
                </div>
              </div>
              <div>
                
                  <Button
                    size="large"
                    type="primary"
                    className="ml-3 no-border"
                    htmlType="button"
                    enabled="true"
                    onClick={handleClick}
                    style={{marginLeft:"1000px"}}
                  >
                    Add User
                  </Button>
               
               
              </div>
            </div>
                
                    <Table
                        dataSource={dataSource}
                        rowKey={(record)=>record.id}
                        columns={columns}
                        bordened
                        loading={loading}
                    >
                    </Table>

            </header>

        </div>
    </div>
);
}
export default Users