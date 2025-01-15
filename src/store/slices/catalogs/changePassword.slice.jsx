import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';

export const changePassSlice = createSlice({
    name: 'changePass',
    initialState: [],
    reducers: {
        setChangePass: (state, action) => {
            return action.payload
        }
    }
})

export const changePassThunk = (userId) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/users/${userId}/changePassword`)
        .then(res => {dispatch(setChangePass(res.data))})
        .finally(() => dispatch(setIsLoading(false)))
};

export const {setChangePass} = changePassSlice.actions;

export default changePassSlice.reducer;