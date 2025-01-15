import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLoader from '../../components/Loaders/MainLoader';
import HelpsComponent from '../../components/helps/HelpsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getOurWorkScreenAdminThunk } from '../../store/slices/pages/page.slice';
import { getItinerarysForPageThunk } from '../../store/slices/catalogs/itinerary.slice';
import { Helmet } from 'react-helmet-async';
import Work from './components/Work';

const WorkPage = () => {

  const serviceState = useSelector(state => state.page);
  const itineraryState = useSelector(state => state.itineraries);
  const isLoading = useSelector(state => state.isLoadingSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOurWorkScreenAdminThunk());
    dispatch(getItinerarysForPageThunk('nuestro_trabajo'));
  }, []);

  return (
    <div className='bg-white'>
      <Helmet>
        <title>Nuestro trabajo - Peef Corp</title>
        <meta name="description" content="xplore our journey from humble beginnings to a leader in Galapagos travel, dedicated to sustainability and excellence" />
      </Helmet>
      {
        isLoading || itineraryState.fetching ? <MainLoader /> :
          <>
            <Navbar />
            <Work serviceState={serviceState.page} services={itineraryState.itineraries} />
            <Footer />
            {/* <HelpsComponent /> */}
          </>
      }
    </div>
  );
};

export default WorkPage;