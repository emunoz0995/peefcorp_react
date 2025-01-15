import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import MainLoader from '../../components/Loaders/MainLoader';
import HelpsComponent from '../../components/helps/HelpsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeScreenAdminThunk } from '../../store/slices/pages/page.slice';
import { getItinerarysForPageThunk } from '../../store/slices/catalogs/itinerary.slice';
import ContactUs from '../../components/contactus/ContactUs';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {

  const homeState = useSelector(state => state.page);
  const itineraryState = useSelector(state => state.itineraries);
  const isLoading = useSelector(state => state.isLoadingSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeScreenAdminThunk());
    dispatch(getItinerarysForPageThunk('servicios'));
  }, []);

  return (
    <div className='bg-white'>
      <Helmet>
        <title>Inicio- Peef Corp</title>
        <meta name="description" content="xplore our journey from humble beginnings to a leader in Galapagos travel, dedicated to sustainability and excellence" />
      </Helmet>
      {
        isLoading || itineraryState.fetching ? <MainLoader /> :
          <>
            <Navbar />
            <Home
              homeState={homeState.pages}
              services={itineraryState.itineraries}
            />
            <ContactUs />
            <Footer />
            {/* <HelpsComponent /> */}
          </>
      }
    </div>
  );
};

export default HomePage;