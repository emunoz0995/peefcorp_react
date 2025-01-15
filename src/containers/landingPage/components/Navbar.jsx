import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//UI
import logo from '../../../assets/favicon.png'
import { FaBars, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FaCloudDownloadAlt, FaDownload, FaTimes } from 'react-icons/fa';
import { RiMailSendLine } from "react-icons/ri";
import { HiOutlineMail } from 'react-icons/hi';
import info from '../../../resources/info.json';


const Navbar = () => {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`hidden lg:flex transition-colors duration-300 font-sans z-20 fixed navbar px-5 ${scroll ? 'bg-[#3dc55dd5]' : 'bg-gray-400/30'}`}>
        <div className="navbar-start pl-10">
          <Link to='/' smooth={true} duration={500} className={`cursor-pointer`}>
            <img className="w-[80px] h-[60px] " src={logo} alt={logo} />
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 text-white text-[15px]">
            <li>
              <Link to='/' smooth={true} duration={500} className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Inicio</h1>
              </Link>
            </li>

            <li>
              <Link to='/sobre_nosotros' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/sobre_nosotros' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Sobre nosotros</h1>
              </Link>
            </li>
            <li>
              <Link to='/servicios' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/servicios' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Servicios</h1>
              </Link>
            </li>
            <li>
              <Link to='/nuestro_trabajo' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/nuestro_trabajo' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Nuestro trabajo</h1>
              </Link>
            </li>
            <li>
              <Link to='/contactanos' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/contactanos' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Contacto</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-20 fixed h-[90px] w-full text-white bg-[#00000055]'>
        {!nav ?
          <div className='flex justify-between h-full items-center'>
            <Link to={'/'}>
              <img className="w-[70px] " src={logo} alt={logo} />
            </Link>
            <div className='flex items-center gap-5 pr-8'>
              <FaBars size={23} />
            </div>
          </div>
          :
          < div className={!nav ? 'hidden' : 'fixed z-30  left-0 w-full h-screen  bg-[#d3d0ce] flex flex-col justify-center items-center text-gray-500'}>
            <div className='w-full flex justify-end pr-5'>
              <FaTimes size={23} />
            </div>
            <div className='flex justify-center items-center cursor-pointer mb-8 duration-75'>
              <Link to={'/'}>
                <img className="w-[80px] " src={logo} alt={logo} />
              </Link>
            </div>
            <div className='flex flex-col gap-10 uppercase items-center font-sans'>
              <Link to='/' smooth={true} duration={500} className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Inicio</h1>
              </Link>
              <Link to='/sobre_nosotros' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/sobre_nosotros' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Sobre nosotros</h1>
              </Link>
              <Link to='/servicios' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/servicios' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Servicios</h1>
              </Link>
              <Link to='/nuestro_trabajo' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/nuestro_trabajo' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Nuestro trabajo</h1>
              </Link>
              <Link to='/contactanos' smooth={true} duration={500}
                className={`h-full flex items-center hover:border-b-2 hover:border-b-[#3dc55dd5] ${location.pathname === '/contactanos' ? ' border-b-2 border-b-[#3dc55dd5]' : ''}`}>
                <h1>Contacto</h1>
              </Link>
              {/* <div className='flex gap-3 justify-center items-center p-5'>
                <a href='mailto:sales@tiptoptravel.ec' aria-label="seand mail" target='_blank' className='hover:text-orange-500 duration-75'>
                  <RiMailSendLine size={23} />
                </a>
                <a href='https://wa.link/u7kidg' aria-label="Contact us to whastapp" target='_blank' className='hover:text-orange-500 duration-75'>
                  <FaWhatsapp size={23} />
                </a>
                <a href='https://www.facebook.com/rolfwittmerfleet' aria-label="Visit our facebook" target='_blank' className='hover:text-orange-500 duration-75'>
                  <FaFacebook size={23} />
                </a>
                <a href='https://www.instagram.com/rolfwittmer/?fbclid=IwAR3HYrhn4JlXxwOknep7bBgLS_8aMUeVV8agIgkwDAffFEa7wSzfwWkKXbE' aria-label="Visit our instagram" target='_blank' className='hover:text-orange-500 duration-75'>
                  <FaInstagram size={23} />
                </a>
              </div> */}
            </div>
          </div>
        }
      </div >
      <div className='hidden lg:flex fixed flex-col right-0 top-[35%] z-30'>
        <ul>
          <li className='w-[150px] h-[60px] flex justify-between items-center relative right-[-100px] hover:right-[0px] duration-300 bg-[#c9842b]'>
            <a
              className='flex justify-between items-center w-full px-3 text-white' target="_blank"
              href={info.contac[0].url}
            >
              <HiOutlineMail size={30} />
              Email
            </a>
          </li>
          <li className='w-[150px] h-[60px] flex justify-between items-center relative right-[-100px] hover:right-[0px] duration-300 bg-[#31ab43]'>
            <a
              className='flex justify-between items-center w-full px-3 text-white' target="_blank"
              href={info.contac[1].url}
            >
              <FaWhatsapp size={30} />
              Whatsapp
            </a>
          </li>
          <li className='w-[150px] h-[60px] flex relative right-[-100px] hover:right-[0px] duration-300 bg-red-500'>
            <a
              className='flex justify-between items-center w-full px-3 text-white' target="_blank"
              href={info.contac[2].url}
            >
              <FaCloudDownloadAlt size={30} />
              Instaladores
            </a>
          </li>
          <li className='w-[150px] h-[60px] flex relative right-[-100px] hover:right-[0px] duration-300 bg-gray-500'>
            <a
              className='flex justify-between items-center w-full px-3 text-white' target="_blank"
              href={info.contac[3].url}
            >
              <FaDownload size={30} />
              Peef
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
