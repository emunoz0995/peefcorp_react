import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../../../resources/utils';

export const yachtSlice = createSlice({
    name: 'yachts',
    initialState: {
        yachts: [],
        yacht: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateYacht(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        requestFetchYachts(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchYachtsSuccess(state, action) {
            return {
                yachts: action.payload,
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchYachtsError(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestFetchYacht(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchYachtSuccess(state, action) {
            return {
                yachts: [],
                yacht: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchYachtError(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestCreateYacht(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createYachtsuccess(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createYachtError(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateYacht(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateYachtsuccess(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateYachtError(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteYacht(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteYachtsuccess(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteYachtError(state, action) {
            return {
                yachts: [],
                yacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },

    }
})

export const getYachtsThunk = () => dispatch => {
    dispatch(requestFetchYachts())
    axios.get('/yachts')
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchYachtsSuccess(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchYachtsError(res.response.data))
            }
        })
};

export const getYachtThunk = (yacht_id) => dispatch => {
    dispatch(requestFetchYacht())
    axios.get(`/yachts/${yacht_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchYachtSuccess(res.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchYachtError(res.response.data))
            }
        })
};

export const createYachtThunk = (data) => dispatch => {
    dispatch(requestCreateYacht())
    axios.post('/yachts/createYacht?images=tiptops', data)
        .then(res => {
            if (res.status === 200) {
                dispatch(createYachtsuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(createYachtError(res.response.data))
            }
        })
};

export const updateYachtThunk = (yacht_id, data) => dispatch => {
    dispatch(requestUpdateYacht())
    axios.put(`/yachts/updateYacht/${yacht_id}?images=tiptops`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(updateYachtsuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(updateYachtError(res.response.data))
            }
        })
};

export const deleteYachtThunk = (yacht_id) => dispatch => {
    dispatch(requestDeleteYacht())
    axios.delete(`/yachts/${yacht_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteYachtsuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(deleteYachtError(res.response.data))
            }
        })
};



export const { initialStateYacht,
    requestFetchYachts,
    fetchYachtsSuccess,
    fetchYachtsError,
    requestFetchYacht,
    fetchYachtSuccess,
    fetchYachtError,
    requestCreateYacht,
    createYachtsuccess,
    createYachtError,
    requestUpdateYacht,
    updateYachtsuccess,
    updateYachtError,
    requestDeleteYacht,
    deleteYachtsuccess,
    deleteYachtError,
} = yachtSlice.actions;

export default yachtSlice.reducer;