import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
//UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLoader from '../../components/Loaders/MainLoader';
import HelpsComponent from '../../components/helps/HelpsComponent';
import About from './components/About';

//SLICE
import { getAboutScreenAdminThunk } from '../../store/slices/pages/page.slice';

const AboutPage = () => {

  const aboutState = useSelector(state => state.page);
  const isLoading = useSelector(state => state.isLoadingSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutScreenAdminThunk());
  }, []);

  return (
    <div className='bg-white'>
       <Helmet>
        <title>Sobre nosotros - Peef Corp</title>
        <meta name="description" content="xplore our journey from humble beginnings to a leader in Galapagos travel, dedicated to sustainability and excellence" />
      </Helmet>
      {
        isLoading ? <MainLoader /> :
          <>
            <Navbar />
            <About aboutState={aboutState.page} />
            <Footer />
            {/* <HelpsComponent /> */}
          </>
      }
    </div>
  );
};

export default AboutPage;