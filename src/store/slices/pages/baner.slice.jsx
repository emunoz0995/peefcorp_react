import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const banerSlice = createSlice({
    name: 'baner',
    initialState: {
        baner: {},
        message: "",
        error: "",
    },
    reducers: {
        initialStateBaner: (state, action) => {
            return {
                baner: {},
                message: "",
                error: "",
            }
        },
        setBaner: (state, action) => {
            return {
                baner: action.payload,
                message: "",
                error: "",
            }
        },
        setBanerMessages: (state, action) => {
            return {
                baner: {},
                message: action.payload,
                error: "",
            }
        },
        setBanerError: (state, action) => {
            return {
                baner: {},
                message: "",
                error: action.payload,
            }
        },
        deleteSuccess(state, action) {
            return {
                baner: {},
                message: action.payload,
                error: "",
            }
        },
        deleteError(state, action) {
            return {
                baner: {},
                message: "",
                error: action.payload,
            }
        },
    }
})

//BANER
export const getBanerByIdThunk = (baner_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/baners/getBaner/${baner_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setBaner(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setBanerError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const createBanerThunk = (data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post(`/baners/createBaner?images=baners`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setBanerMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setBanerError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const updateBanerThunk = (baner_id, data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.put(`/baners/updateBaner/${baner_id}?images=baners`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setBanerMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setBanerError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const {
    initialStateBaner,
    setBaners,
    setBaner,
    setBanerMessages,
    setBanerError,
} = banerSlice.actions;

export default banerSlice.reducer;