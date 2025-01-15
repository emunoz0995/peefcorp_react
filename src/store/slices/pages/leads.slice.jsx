import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        leads: [],
        lead: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateLead: (state, action) => {
            return {
                leads: [],
                lead: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        requestCreateLeads(state, action) {
            return {
                leads: [],
                lead: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        setLeads: (state, action) => {
            return {
                leads: action.payload,
                lead: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        setLead: (state, action) => {
            return {
                leads: [],
                lead: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        setLeadMessages: (state, action) => {
            return {
                leads: [],
                lead: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        setLeadError: (state, action) => {
            return {
                leads: [],
                lead: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getLeadsThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/leads`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLeads(res.data))
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

export const getLeadThunk = (lead_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`/leads/${lead_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLead(res.data))
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

export const createLeadThunk = (data) => dispatch => {
    dispatch(requestCreateLeads());
    axios.post(`/leads/createLead`, data)
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
};


export const updateLeadThunk = (lead_id, data) => dispatch => {
    dispatch(setIsLoading(true));
    axios.put(`/leads/updateLead/${lead_id}`, data)
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


export const deleteLeadThunk = (lead_id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.delete(`/leads/${lead_id}`)
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


export const { initialStateLead,
    setLeads,
    setLead,
    requestCreateLeads,
    setLeadMessages,
    setLeadError,
} = leadsSlice.actions;

export default leadsSlice.reducer;