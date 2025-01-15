import React from 'react';
import DOMPurify from 'dompurify';
import Divider from '../../../components/Dividers/Divider';
import BtnMotion from '../../../components/buttons/BtnMotion';
import { FaArrowRight } from 'react-icons/fa6';
import { API_BASE_URL } from '../../../store/constans';
import Sections from '../../../components/sections/Sections';

const About = ({ aboutState }) => {

  return (
    <div className='flex flex-col'>
      <section className={`flex justify-center items-center h-screen md:items-end md:py-14 px-5 bg-fixed bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${aboutState.baner?.image})` }} >
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/60 "></div>
        <div className='flex w-full z-10 md:pl-10'>
          <div className=' p-2 text-start md:pr-20 md:mr-20 text-white'>
            <p className='text-[35px] md:text-[45px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutState.baner?.title) }}></p>
            <p className='text-[20px] md:text-[22px] font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutState.baner?.text) }}></p>
            <BtnMotion to={'/servicios'}>
              Ver Servicios
              <FaArrowRight />
            </BtnMotion>
          </div>
        </div>
      </section>
      <section className='flex flex-col md:flex-row md:h-[300px] w-full'>
        <div className={`w-full flex flex-col md:p-10 transition-all bg-t-primary text-white justify-center items-center`}>
          <div className='my-5'>
            <h3 className='text-[45px] uppercase px-[10px] md:px-[50px] text-center font-semibold mb-5'>Misión</h3>
            <p className='text-justify px-[10px] md:px-[50px]'>
              Ser un aliado tecnológico integral, ofreciendo soluciones en equipos electrónicos, software contable, RRHH y desarrollo personalizado, con un enfoque en calidad y soporte al cliente, impulsando la eficiencia y el crecimiento de nuestros clientes a través de tecnología de vanguardia.
            </p>
          </div>
        </div>
        <Divider />
        <div className={`w-full flex flex-col md:p-10 transition-all bg-t-primary text-white justify-center items-center`}>
          <div className='my-5'>
            <h3 className='text-[45px] uppercase px-[10px] md:px-[50px] text-center font-semibold mb-5'>Visión</h3>
            <p className='text-justify px-[10px] md:px-[50px]'>
              Convertirnos en la empresa líder en soluciones tecnológicas integrales en Ecuador, reconocida por su innovación, confiabilidad y excelencia en el servicio.            </p>
          </div>
        </div>
      </section>
 
        {
          aboutState.sections?.map(section => (
            <Sections state={section} />
          ))
        }
     

    </div>
  );
};

export default About;
