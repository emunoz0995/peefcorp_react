import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HelpsComponent from '../../components/helps/HelpsComponent';
import ContactUs from '../../components/contactus/ContactUs';
import { scrollToTop } from '../../utils/funtions';

const ContactPage = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div className='bg-white'>
      <Navbar />
      <ContactUs />
      <Footer />
      {/* <HelpsComponent /> */}

    </div>
  );
};

export default ContactPage;