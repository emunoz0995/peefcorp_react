import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToolbarStore } from '../../store/VitalStore';
//UI
import { FaUser } from 'react-icons/fa';
import BtnCircle from '../buttons/BtnCircle';
import { useTranslation } from "react-i18next";



const NavTop = () => {
  const { openToolbar } = useToolbarStore((state) => state);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logOut = () => {
    localStorage.clear()
  };

  return (
    <nav className="absolute bg-gradient-to-l from-[#80af50] to-green-700/80 shadow-lg flex w-calc md:right-0 h-14 items-center">
      <div className="md:hidden absolute left-3">
        <BtnCircle btnAction={() => openToolbar()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </BtnCircle>
      </div>
      <div className="absolute right-3 md:right-3 md:w-[18%] flex justify-center h-[100%] items-center">
        <div className="dropdown dropdown-end h-full w-full">
          <BtnCircle>
            <div className='flex flex-col'>
              <h1 className='text-[13px] font-semibold'>Bienvenido</h1>
              <p className='text-sm'>{user.userName}</p>
            </div>
            <div className='bg-gradient-to-r from-[#80af50] to-[#f7931d] w-10 h-10 flex justify-center items-center rounded-full'>
              <div className='bg-gray-300 w-9 h-9 flex justify-center items-center rounded-full'>
                <FaUser size={"24px"} color='#2c6a80' />
              </div>
            </div>
          </BtnCircle>
          <ul
            className="dropdown-content menu p-2 shadow-lg bg-white w-full "
          >
            <li className='text-gray-400 z-20'>
              <Link onClick={logOut} to="/panel" href="#" className=' flex gap-3 justify-center items-center p-2 hover:text-gray-800 duration-75'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  >
                  <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z" />
                </svg>
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
