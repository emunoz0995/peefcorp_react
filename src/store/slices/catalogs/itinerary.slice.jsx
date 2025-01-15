import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../../../resources/utils';

export const itinerarySlice = createSlice({
    name: 'itineraries',
    initialState: {
        itineraries: [],
        itinerary: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateItinerary(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        requestFetchItineraries(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchItinerariesSuccess(state, action) {
            return {
                itineraries: action.payload,
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchItinerariesError(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestFetchItinerary(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchItinerarySuccess(state, action) {
            return {
                itineraries: [],
                itinerary: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchItineraryError(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestCreateItinerary(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createItinerarysuccess(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createItineraryError(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateItinerary(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateItinerarysuccess(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateItineraryError(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteItinerary(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteItinerarysuccess(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteItineraryError(state, action) {
            return {
                itineraries: [],
                itinerary: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },

    }
})

export const getItinerarysForPageThunk = (page) => dispatch => {
    dispatch(requestFetchItineraries())
    axios.get(`/itineraries/page/${page}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchItinerariesSuccess(res.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchItinerariesError(res.response.data))
            }
        })
};

export const getItineraryThunk = (itinerary_id) => dispatch => {
    dispatch(requestFetchItinerary())
    axios.get(`/itineraries/${itinerary_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchItinerarySuccess(res.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchItineraryError(res.response.data))
            }
        })
};

export const createItineraryThunk = (data) => dispatch => {
    dispatch(requestCreateItinerary())
    axios.post('/itineraries/createItinerary?images=services', data)
        .then(res => {
            if (res.status === 200) {
                dispatch(createItinerarysuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(createItineraryError(res.response.data))
            }
        })
};

export const updateItineraryThunk = (itinerary_id, data) => dispatch => {
    dispatch(requestUpdateItinerary())
    axios.put(`/itineraries/updateItinerary/${itinerary_id}?images=services`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(updateItinerarysuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(updateItineraryError(res.response.data))
            }
        })
};

export const deleteItineraryThunk = (itinerary_id) => dispatch => {
    dispatch(requestDeleteItinerary())
    axios.delete(`/itineraries/${itinerary_id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteItinerarysuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(deleteItineraryError(res.response.data))
            }
        })
};



export const { initialStateItinerary,
    requestFetchItineraries,
    fetchItinerariesSuccess,
    fetchItinerariesError,
    requestFetchItinerary,
    fetchItinerarySuccess,
    fetchItineraryError,
    requestCreateItinerary,
    createItinerarysuccess,
    createItineraryError,
    requestUpdateItinerary,
    updateItinerarysuccess,
    updateItineraryError,
    requestDeleteItinerary,
    deleteItinerarysuccess,
    deleteItineraryError,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;