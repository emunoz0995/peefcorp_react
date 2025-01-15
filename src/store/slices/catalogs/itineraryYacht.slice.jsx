import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../../../resources/utils';


export const itineraryYachtSlice = createSlice({
    name: 'itineraryYacht',
    initialState: {
        itineraryYachts: [],
        itineraryYacht: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateItineraryYacht(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        requestFetchItineraryYachts(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchItineraryYachtsSuccess(state, action) {
            return {
                itineraryYachts: action.payload,
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchItineraryYachtsError(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestCreateItineraryYacht(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createItineraryYachtsuccess(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createItineraryYachtError(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteItineraryYacht(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteItineraryYachtsuccess(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteItineraryYachtError(state, action) {
            return {
                itineraryYachts: [],
                itineraryYacht: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },

    }
})

export const getItineraryYachtsThunk = (itinerary_id) => dispatch => {
    dispatch(requestFetchItineraryYachts())
    axios.get(`/itineraries/${itinerary_id}/yachts`)
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchItineraryYachtsSuccess(res.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(fetchItineraryYachtsError(res.response.data))
            }
        })
};

export const createItineraryYachtThunk = (itinerary_id, data) => dispatch => {
    dispatch(requestCreateItineraryYacht())
    axios.post(`/itineraries/${itinerary_id}/assingYacht`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(createItineraryYachtsuccess(res.data.data))
            } 
        })
        .catch(res => { 
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(createItineraryYachtError(res.response.data))
            }
        })
};


export const deleteItineraryYachtThunk = (itinerary_id, id) => dispatch => {
    dispatch(requestDeleteItineraryYacht())
    axios.delete(`/itineraries/${itinerary_id}/yacht/${id}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteItineraryYachtsuccess(res.data.data))
            } 
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(deleteItineraryYachtError(res.response.data))
            }
        })
};



export const { initialStateItineraryYacht,
    requestFetchItineraryYachts,
    fetchItineraryYachtsSuccess,
    fetchItineraryYachtsError,
    requestCreateItineraryYacht,
    createItineraryYachtsuccess,
    createItineraryYachtError,
    requestDeleteItineraryYacht,
    deleteItineraryYachtsuccess,
    deleteItineraryYachtError,
} = itineraryYachtSlice.actions;

export default itineraryYachtSlice.reducer;