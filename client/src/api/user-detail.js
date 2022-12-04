import instance from './axios'
import axios from 'axios'
export const getUser = (id) => axios.get(`/user/${id}`)
export const deleteUser = (id) => axios.delete(`http://localhost:8000/api/delete-user/${id}`)
