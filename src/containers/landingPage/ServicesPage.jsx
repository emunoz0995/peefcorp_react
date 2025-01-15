import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLoader from '../../components/Loaders/MainLoader';
import HelpsComponent from '../../components/helps/HelpsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesScreenAdminThunk } from '../../store/slices/pages/page.slice';
import { getItinerarysForPageThunk } from '../../store/slices/catalogs/itinerary.slice';
import Services from './components/Services';
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {

  const serviceState = useSelector(state => state.page);
  const itineraryState = useSelector(state => state.itineraries);
  const isLoading = useSelector(state => state.isLoadingSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesScreenAdminThunk());
    dispatch(getItinerarysForPageThunk('servicios'));
  }, []);

  return (
    <div className='bg-white'>
      <Helmet>
        <title>Servicios - Peef Corp</title>
        <meta name="description" content="xplore our journey from humble beginnings to a leader in Galapagos travel, dedicated to sustainability and excellence" />
      </Helmet>
      {
        isLoading || itineraryState.fetching ? <MainLoader /> :
          <>
            <Navbar />
            <Services serviceState={serviceState.page} services={itineraryState.itineraries} />
            <Footer />
            {/* <HelpsComponent /> */}
          </>
      }
    </div>
  );
};

export default ServicesPage;