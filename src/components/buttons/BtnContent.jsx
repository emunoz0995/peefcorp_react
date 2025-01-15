import React from 'react';
import useModalStore from '../../store/VitalStore';
import { useNavigate } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

export default function BtnContent({ children, type, cancel, to, onclick, school, funtion, action }) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFuntion = () => {
    funtion();
  };



  if (cancel) {
    return (
      <div
        onClick={() => navigate(`${to}`)}
        className={`bg-gray-400 hover:bg-gray-600 cursor-pointer 
        text-white  transition-all active:scale-95 p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center`}
      >
        {children}
      </div>
    );
  }

  if (type === 'initDay') {
    return (
      <div
        onClick={() => handleFuntion()}
        className={`bg-gray-400 hover:bg-gray-600 cursor-pointer 
        text-white  transition-all active:scale-95 p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/80 flex items-center justify-center`}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      type={type && type}
      className={`
        text-white  transition-all p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center justify-center ${type === 'submit'
          ? 'bg-sky-700 hover:bg-sky-800 active:scale-95'
          : 'bg-gray-300'
        }`}
    >
      {children}
    </button>
  );
}
