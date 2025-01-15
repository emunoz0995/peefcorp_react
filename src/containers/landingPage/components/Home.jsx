import React from 'react';
import DOMPurify from 'dompurify';
import BtnMotion from '../../../components/buttons/BtnMotion';
import { FaArrowRight } from 'react-icons/fa6';
import { API_BASE_URL } from '../../../store/constans';

const Home = ({ homeState, services }) => {

  return (
    <div className='flex flex-col'>
      <div className={`flex justify-center items-center h-screen md:items-end md:py-14 px-5 bg-fixed bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${homeState[0]?.image})` }} >
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/60 "></div>
        <div className='flex w-full z-10 md:pl-10'>
          <div className=' p-2 text-start md:pr-20 md:mr-20'>
            <p className='text-[35px] md:text-[45px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[0]?.title) }}></p>
            <p className='text-[20px] md:text-[22px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[0]?.text) }} ></p>
            <BtnMotion to={'/servicios'}>
              Ver Servicios
              <FaArrowRight />
            </BtnMotion>
          </div>
        </div>
      </div>
      <div className='flex flex-col h-full md:h-screen bg-fixed md:justify-center items-center p-5'>
        <section className='flex flex-col md:flex-row w-full'>
          <div className={`w-full`}>
            <img src={API_BASE_URL + homeState[1]?.image} alt="" />
          </div>
          <div className={`w-full flex flex-col md:p-10 transition-all justify-center items-center`}>
            <div className='my-5'>
              <h3 className='text-[45px] text-start font-semibold mb-5 text-p-secundary' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[1]?.title) }}></h3>
              <p className='text-justify text-[20px] text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[1]?.text) }}></p>
            </div>
            <div className='flex justify-start w-full'>
              <BtnMotion to={'/sobre_nosotros'}>
                Sobre nosotros
                <FaArrowRight />
              </BtnMotion>
            </div>
          </div>
        </section>
      </div>
      <div className='flex flex-col h-full md:h-screen bg-[#f5f5f5] md:justify-center items-center p-5'>
        <section className='flex flex-col md:flex-row w-full'>
          <div className={`w-full flex flex-col md:px-10 transition-all`}>
            <div>
              <h3 className='text-[45px] text-start font-semibold mb-5 text-p-secundary' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[2]?.title) }}></h3>
              <p className='text-justify text-[20px] text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[2]?.text) }}></p>
              <ul className='text-start my-5 text-[15px] list-disc px-10 '>
                {
                  services.map(service => (
                    <li key={service.id}>
                      {service.name}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='flex justify-start w-full'>
              <BtnMotion to={'/servicios'}>
                Todos los servicios
                <FaArrowRight />
              </BtnMotion>
            </div>
          </div>
          <div className={`w-full`}>
            <img src={API_BASE_URL + homeState[2]?.image} alt="" />
          </div>
        </section>
      </div>
      <div className='flex flex-col h-full md:h-screen bg-p-secundary text-white md:justify-center items-center p-5'>
        <section className='flex flex-col md:flex-row w-full'>
          <div className={`w-full`}>
            <img src={API_BASE_URL + homeState[3]?.image} alt="" />
          </div>
          <div className={`w-full flex flex-col md:p-10 transition-all justify-center items-center`}>
            <div className='my-5'>
              <h3 className='text-[45px] text-start font-semibold mb-5 text-p-secundary' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[3]?.title) }}></h3>
              <p className='text-justify text-[20px]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeState[3]?.text) }}></p>
            </div>
            <div className='flex justify-start w-full'>
              <BtnMotion to={'/nuestro_trabajo'}>
                Nuestro trabajo
                <FaArrowRight />
              </BtnMotion>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
