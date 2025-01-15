import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const sectionSlice = createSlice({
    name: 'sections',
    initialState: {
        section: {},
        message: "",
        error: "",
    },
    reducers: {
        initialStateSection: (state, action) => {
            return {
                section: {},
                message: "",
                error: "",
            }
        },
        setSection: (state, action) => {
            return {
                section: action.payload,
                message: "",
                error: "",
            }
        },
        setSectionMessages: (state, action) => {
            return {
                section: {},
                message: action.payload,
                error: "",
            }
        },
        setSectionError: (state, action) => {
            return {
                section: {},
                message: "",
                error: action.payload,
            }
        },
        deleteSuccess(state, action) {
            return {
                section: {},
                message: action.payload,
                error: "",
            }
        },
        deleteError(state, action) {
            return {
                section: {},
                message: "",
                error: action.payload,
            }
        },
    }
})

//Section
export const getSectionByIdThunk = (section_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/sections/getSection/${section_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setSection(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setSectionError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const createSectionThunk = (data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post(`/sections/createSection?images=sections`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setSectionMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setSectionError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const updateSectionThunk = (section_id, data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.put(`/sections/updateSection/${section_id}?images=sections`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setSectionMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setSectionError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const {
    initialStateSection,
    setSections,
    setSection,
    setSectionMessages,
    setSectionError,
} = sectionSlice.actions;

export default sectionSlice.reducer;