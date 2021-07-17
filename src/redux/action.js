import * as types from './actionType'
import axios from 'axios'

const getUser =  (user) => ({
    type: types.GET_USERS,
    payload: user
})

const userDelete = () => ({
    type: types.DELETE_USERS,
})

const userAdd = () => ({
    type: types.ADD_USER,
})

const singleUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})

const userUpdate = () => ({
    type: types.UPDATE_USER
})

const adminLogin = (info) => ({
    type: types.LOGIN,
    payload: info
})


export const LoginF = (username, password) => {
    return function(dispatch) {
        axios.get(`${process.env.REACT_APP_API}/login`)
            .then((res) => {
                console.log("res", res)
                const vals = res.data
                for(let i = 0; i < vals.length; i++)
                {
                    if(vals[i].username === username && password === vals[i].password)
                    dispatch(adminLogin(vals[i]))
                else
                    dispatch(adminLogin("error"))
                }


                   
            
                    
            })
            .catch(err => console.log(err))

    }
}

export const loadUsers = () => {
    return function (dispatch)  {
        axios.get(`${process.env.REACT_APP_API}/user`)
            .then((res) => {
                dispatch(getUser(res.data));
            })
            .catch(err => console.log(err))
    }
}

export const deleteUsers = (id) => {
    return function (dispatch)  {
        axios.delete(`${process.env.REACT_APP_API}/user/${id}`)
            .then((res) => {
                dispatch(userDelete())
                dispatch(loadUsers())
            })
            .catch(err => console.log(err))
    }
}

export const addUser = (user) => {
    return function (dispatch)  {
        axios.post(`${process.env.REACT_APP_API}/user`, user)
            .then((res) => {
                dispatch(userAdd())
                // dispatch(loadUsers())
            })
            .catch(err => console.log(err))
    }
}

export const getSingleUser = (id) => {
    return function (dispatch)  {
        axios.get(`${process.env.REACT_APP_API}/user/${id}`)
            .then((res) => {
                dispatch(singleUser(res.data))
            })
            .catch(err => console.log(err))
    }
}

export const upDateUser = (user, id) => {
    return function (dispatch)  {
        axios.put(`${process.env.REACT_APP_API}/user/${id}`, user)
            .then((res) => {
                dispatch(userUpdate())
            })
            .catch(err => console.log(err))
    }
}