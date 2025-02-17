import React from 'react';
import DOMPurify from 'dompurify';
import BtnMotion from '../../../components/buttons/BtnMotion';
import ServicesCard from '../../../components/cards/ServicesCard';
import Sections from '../../../components/sections/Sections';
import { FaArrowRight } from 'react-icons/fa6';
import { API_BASE_URL } from '../../../store/constans';

const Services = ({ serviceState, services }) => {

  return (
    <div className='flex flex-col'>
      <section className={`flex justify-center items-center h-screen md:items-end md:py-14 px-5 bg-fixed bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${serviceState.baner?.image})` }} >
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/60 "></div>
        <div className='flex w-full z-10 md:pl-10'>
          <div className=' p-2 text-start md:pr-20 md:mr-20 text-white'>
            <p className='text-[35px] md:text-[45px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(serviceState.baner?.title) }}></p>
            <p className='text-[20px] md:text-[22px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(serviceState.baner?.text) }}></p>
            {/* <BtnMotion to={'/servicios'}>
              Ver Servicios
              <FaArrowRight />
            </BtnMotion> */}
          </div>
        </div>
      </section>
      {
        serviceState.sections?.map(section => (
          <Sections state={section} />
        ))
      }
      <div className='flex justify-center p-5'>
        <h3 className='text-[35px] md:text-[45px] text-start font-semibold md:mb-5 text-p-secundary'>Nuestros servicios</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:p-8 h-full bg-fixed justify-center items-center'>
        {
          services.map(service => (
            <div className='flex justify-center items-center'>
              <ServicesCard destinationState={service} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Services;