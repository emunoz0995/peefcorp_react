import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        message: "",
        error: "",
    },
    reducers: {
        initialStateUser: (state, action) => {
            return {
                users: [],
                user: {},
                message: "",
                error: "",
            }
        },
        setUsers: (state, action) => {
            return {
                users: action.payload,
                user: {},
                message: "",
                error: "",
            }
        },
        setUser: (state, action) => {
            return {
                users: [],
                user: action.payload,
                message: "",
                error: "",
            }
        },
        setUserMessages: (state, action) => {
            return {
                users: [],
                user: {},
                message: action.payload,
                error: "",
            }
        },
        setUserError: (state, action) => {
            return {
                users: [],
                user: {},
                message: "",
                error: action.payload,
            }
        },
        requestchangePasswordUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        changePasswordUserSuccess(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        changePasswordUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestForgotPasswordUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        ForgotPasswordUserSuccess(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        ForgotPasswordUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getUsersThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/users`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUsers(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const getSalesUsersThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/users/getSalesUsers`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUsers(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const getUserThunk = (user_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/users/${user_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUser(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const createUserThunk = (data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post(`/users/createUser`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUserMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const updateUserThunk = (user_id, data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.put(`/users/updateUser/${user_id}`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUserMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const deleteUserThunk = (user_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.delete(`/users/${user_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUserMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setUserError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const signInThunk = (data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post('/auth/login', data)
        .then(res => {
            dispatch(setUser(res.data))
        })
        .catch(error => {
            dispatch(setUserError(error.response.data.data))
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const upgradePassword = (user_id, data) => dispatch => {
    dispatch(requestchangePasswordUser());
    axios.put(`/auth/upgradePassword/${user_id}`, data)
        .then(res => {
            dispatch(changePasswordUserSuccess(res.data.data))
        })
        .catch(res => {
            dispatch(changePasswordUserError(res.response.data))
        })
};

export const ForgotPasswordUser = (data) => dispatch => {
    dispatch(requestForgotPasswordUser());
    axios.put('/auth/forgotPassword', data)
        .then(res => {
            dispatch(ForgotPasswordUserSuccess(res.data.data))
        })
        .catch(res => {
            dispatch(ForgotPasswordUserError(res.response.data))
        })
};


export const { initialStateUser,
    setUsers,
    setUser,
    setUserMessages,
    setUserError,
    requestchangePasswordUser,
    changePasswordUserSuccess,
    changePasswordUserError,
    requestForgotPasswordUser,
    ForgotPasswordUserSuccess,
    ForgotPasswordUserError } = usersSlice.actions;

export default usersSlice.reducer;