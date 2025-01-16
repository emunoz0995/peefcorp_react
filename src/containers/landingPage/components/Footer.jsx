import React from 'react'
import { Link } from 'react-scroll';
import { FaFacebookF, FaInstagram, } from 'react-icons/fa';
import bg from '../../../assets/img4.png'

const Footer = () => {
  return (
    <div className='hidden md:flex flex-col h-[250px] bg-cover bg-center' style={{ backgroundImage: `url(${bg})`}}>
      <div className='hidden md:grid md:grid-cols-3 text-white relative font-sans w-full h-full z-20 justify-around bg-slate-600/80 py-5 px-10 '>
        <div className='flex flex-col text-sm p-5 justify-center'>
          <p className='font-bold text-start mb-4'>Quito - Ecuador</p>
          <div className='flex flex-col gap-3'>
            {/* <div className='flex flex-row gap-8'>
              <p>Direccio:</p>
              <p>Quito - Ecuador</p>
            </div> */}
            <div className='flex flex-row gap-8'>
              <p>Teléfono:</p>
              <div>
                <p>(+ 593) 99 588 8870</p>
              </div>

            </div>
            <div className='flex flex-row gap-2'>
              <p>Mail:</p>
              <p>info@peefcorporation.com</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center border-l-2 border-r-2'>
          <div className='flex flex-col cursor-pointer gap-3 uppercase text-[13px]'>
            <Link to='home' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Inicio</p>
            </Link>
            <Link to='about' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Sobre nosotros</p>
            </Link>
            <Link to='work' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Servicios</p>
            </Link>
            <Link to='work' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Nuestro trabajo</p>
            </Link>
            {/* <Link to='work' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Precios</p>
            </Link> */}
            <Link to='work' smooth={true} duration={500} className='hover:text-[#3dc55dd5] duration-75'>
              <p>Contacto</p>
            </Link>            
           
          </div>
        </div>
        <div className='flex flex-col justify-center items-center px-14 gap-5'>
          <div>
            <h1 className='font-semibold text-[20px]'>S I G U E N O S</h1>
            <p className='text-[13px]'>EN NUESTRAS REDES SOCIALES</p>
          </div>
          <div className='w-full flex gap-5 justify-center'>
            <div>
              <a
                target="_blank"
                aria-label="Visit our instagram"
                href='#'
                className='flex  justify-center py-1 text-[25px] bg-white rounded-full w-12 h-12 items-center hover:text-[28px] duration-100'>
                <FaFacebookF className='text-gray-500' />
              </a>
            </div>
            <div>
              <a
                target="_blank"
                aria-label="Visit our instagram"
                href='#'
                className='flex justify-center py-1 text-[30px] bg-white rounded-full w-12 h-12 items-center hover:text-[33px] duration-100'>
                <FaInstagram className='text-gray-500' />
              </a>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Footer