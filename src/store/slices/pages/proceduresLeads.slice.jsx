import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const proceduresLeadsSlice = createSlice({
    name: 'proceduresLeads',
    initialState: {
        leads: [],
        lead: {},
        message: "",
        error: "",
    },
    reducers: {
        initialStateProcedureLead: (state, action) => {
            return {
                leads: [],
                lead: {},
                message: "",
                error: "",
            }
        },
        setLeads: (state, action) => {
            return {
                leads: action.payload,
                lead: {},
                message: "",
                error: "",
            }
        },
        setLead: (state, action) => {
            return {
                leads: [],
                lead: action.payload,
                message: "",
                error: "",
            }
        },
        setLeadMessages: (state, action) => {
            return {
                leads: [],
                lead: {},
                message: action.payload,
                error: "",
            }
        },
        setLeadError: (state, action) => {
            return {
                leads: [],
                lead: {},
                message: "",
                error: action.payload,
            }
        },
    }
})

export const assingLeadToUser = (lead_id, data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.put(`/leads/assingLeadtoUser/${lead_id}`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLeadMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setLeadError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const createTrakin = (data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post(`/leads/createTrakin`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLeadMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setLeadError(res.response?.data))
            }
        })
        .finally(() => dispatch(setIsLoading(false)))
};


export const { initialStateProcedureLead,
    setLeads,
    setLead,
    setLeadMessages,
    setLeadError,
} = proceduresLeadsSlice.actions;

export default proceduresLeadsSlice.reducer;