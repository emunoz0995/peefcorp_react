import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../../../resources/utils';

export const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestFetchRoles(state, action) {
            return {
                roles: [],
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchRolesSuccess(state, action) {
            return {
                roles: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchRolesError(state, action) {
            return {
                roles: [],
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getRolesThunk = () => dispatch => {
    dispatch(requestFetchRoles())
    axios.get('/roles')
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchRolesSuccess(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchRolesError(res.response.data))
            }
        })
};


export const { requestFetchRoles, 
               fetchRolesSuccess, 
               fetchRolesError,
            } = rolesSlice.actions;

export default rolesSlice.reducer;