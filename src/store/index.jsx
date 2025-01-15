import { configureStore } from '@reduxjs/toolkit';
//CATALOGS
import users from './slices/catalogs/users.slice';
import isLoadingSlice from './slices/isLoading.slice';
import roles from './slices/catalogs/roles.slice';
import itineraries from './slices/catalogs/itinerary.slice';
import itineraryYacht from './slices/catalogs/itineraryYacht.slice';
//PAGE
import page from './slices/pages/page.slice';
import leads from './slices/pages/leads.slice';
import proceduresLeads from './slices/pages/proceduresLeads.slice';
import baner from './slices/pages/baner.slice'
import sections from './slices/pages/section.slice';

export default configureStore({
  reducer: {
    users,
    isLoadingSlice,
    roles,
    itineraries,
    itineraryYacht,
    page,
    leads,
    proceduresLeads,
    baner,
    sections
	}
})