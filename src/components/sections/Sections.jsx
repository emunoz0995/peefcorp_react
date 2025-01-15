import React from 'react';
import DOMPurify from 'dompurify';
import { API_BASE_URL } from '../../store/constans';
import BtnMotion from '../buttons/BtnMotion';
import { FaArrowRight } from 'react-icons/fa6';

const Sections = ({ state }) => {
    {
        if (state.position === 1) {
            return (

                <div key={state.id} className='flex flex-col h-full md:h-screen bg-fixed md:justify-center items-center p-5'>
                    <state className='flex flex-col md:flex-row w-full'>
                        <div className={`w-full`}>
                            <img src={API_BASE_URL + state.image} alt="" />
                        </div>
                        <div className={`w-full flex flex-col md:p-10 transition-all justify-center items-center`}>
                            <div className='my-5'>
                                <h3 className='text-[45px] text-start font-semibold mb-5 text-p-secundary' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.title) }}></h3>
                                <p className='text-justify text-[20px] text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.text) }}></p>
                            </div>
                            <div className='flex justify-start w-full'>
                                <a
                                    target="_blank"
                                    href='https://api.whatsapp.com/send/?phone=593995888870&text=Hola+me+interesa+contactarme+contigo&type=phone_number&app_absent=0'
                                    className='flex my-5 justify-center items-center gap-2 active:scale-95 transition-all hover:scale-110 hover:bg-green-500 bg-green-600 text-white p-2 rounded-sm font-bold shadow-lg shadow-base-content/30'>
                                    Contactanos
                                    <FaArrowRight />
                                </a>
                            </div>
                        </div>
                    </state>
                </div>
            )
        } else if (state.position === 2) {
            return (
                <div className='flex flex-col h-full md:h-screen bg-[#f5f5f5] md:justify-center items-center p-5'>
                    <state className='flex flex-col md:flex-row w-full'>
                        <div className={`w-full flex flex-col md:p-10 transition-all justify-center items-center`}>
                            <div className='my-5'>
                                <h3 className='text-[45px] text-start font-semibold mb-5 text-p-secundary' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.title) }}></h3>
                                <p className='text-justify text-[20px] text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.text) }}></p>
                            </div>
                            <div className='flex justify-start w-full'>
                                <a
                                    target="_blank"
                                    href='https://api.whatsapp.com/send/?phone=593995888870&text=Hola+me+interesa+contactarme+contigo&type=phone_number&app_absent=0'
                                    className='flex my-5 justify-center items-center gap-2 active:scale-95 transition-all hover:scale-110 hover:bg-green-500 bg-green-600 text-white p-2 rounded-sm font-bold shadow-lg shadow-base-content/30'>
                                    Contactanos
                                    <FaArrowRight />
                                </a>
                            </div>
                        </div>
                        <div className={`w-full`}>
                            <img src={API_BASE_URL + state.image} alt="" />
                        </div>
                    </state>
                </div>
            );
        }
    }
};

export default Sections;