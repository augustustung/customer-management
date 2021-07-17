import * as types from './actionType'

const initState = {
    admin: null,
    isLoggedIn: false,
    users: [],
    user:{},
    loading: true
}

const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case types.LOGIN:
            return {
                ...state,
                admin: action.payload,
                isLoggedIn: true
            }
        case types.LOGOUT:
            return {
                ...state,
                admin: null,
                isLoggedIn: false
            }
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case types.DELETE_USERS:
        case types.ADD_USER:
        case types.UPDATE_USER:
            return {
                ...state,
                loading: false
            }
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user:action.payload,
                loading: false
            }
        
           
        default:
            return state;
    }
}

export default usersReducer