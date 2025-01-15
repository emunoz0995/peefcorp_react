import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const PageSlice = createSlice({
    name: 'page',
    initialState: {
        page: {},
        message: "",
        error: "",
    },
    reducers: {
        initialStatePage: (state, action) => {
            return {
                pages: [],
                page: {},
                message: "",
                error: "",
            }
        },
        setPages: (state, action) => {
            return {
                pages: action.payload,
                page: {},
                message: "",
                error: "",
            }
        },
        setPage: (state, action) => {
            return {
                pages: [],
                page: action.payload,
                message: "",
                error: "",
            }
        },
        setPageMessages: (state, action) => {
            return {
                pages: [],
                page: {},
                message: action.payload,
                error: "",
            }
        },
        setPageError: (state, action) => {
            return {
                pages: [],
                page: {},
                message: "",
                error: action.payload,
            }
        },
        deleteSuccess(state, action) {
            return {
                pages: [],
                page: {},
                message: action.payload,
                error: "",
            }
        },
        deleteError(state, action) {
            return {
                pages: [],
                page: {},
                message: "",
                error: action.payload,
            }
        },
    }
})

//HomeList
export const getHomeScreenAdminThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/screens/homeContent`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setPages(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setPageError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const getAboutScreenAdminThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/screens/aboutContent`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setPage(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setPageError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const getServicesScreenAdminThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/screens/servicesContent`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setPage(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setPageError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const getOurWorkScreenAdminThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/screens/ourWorkContent`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setPage(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setPageError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};



export const {
    initialStatePage,
    setPages,
    setPage,
    setPageMessages,
    setPageError,
} = PageSlice.actions;

export default PageSlice.reducer;