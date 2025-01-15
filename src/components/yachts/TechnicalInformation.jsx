import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaFileDownload } from 'react-icons/fa';
import { API_BASE_URL } from '../../store/constans';
import MainLoader from '../Loaders/MainLoader';
import { donwloadFileThunk } from '../../store/slices/donwloadFile.slice';
import { useDispatch } from 'react-redux';
import TechInfoSlider from '../sliders/TechInfoSlider';

const TechnicalInformation = ({ techInformation }) => {

    const dispatch = useDispatch();

    function getFileNameFromPath(path) {
        return path.split('/').pop();
    }

    const handleDownload = (filename) => {
        dispatch(donwloadFileThunk(filename))
    };

    return (
        <>
            {techInformation === undefined ? <MainLoader /> :
                <div className='bg-white flex flex-col h-screen'>
                    <div className='h-[200px] w-full'>
                        <div className='bg-white h-full md:mx-[156px] flex flex-col md:flex-row'>
                            <button onClick={() => handleDownload(getFileNameFromPath(techInformation[0]?.rwFile))} className='text-[22px] text-[#2e6a82] w-full h-full flex flex-col justify-center items-center hover:text-[#f29100] duration-75'>
                                <div className='text-start font-semibold'>
                                    <h3 className='tracking-tight'>T E C H N I C A L</h3>
                                    <div className='flex gap-3 items-center'>
                                        <h3 className='tracking-wide'>I N F O R M A T I O N</h3>
                                        <FaFileDownload />
                                    </div>
                                </div>
                            </button>
                            <div className='text-[16px] text-[#2e6a82] font-sans w-full h-full flex flex-col justify-center items-center'>
                                <div className='ml-[-47px] items-start flex gap-2 '>
                                    <h3>Length:  {techInformation[0]?.length}</h3>
                                    <h3>| Beam:  {techInformation[0].beam} </h3>
                                </div>
                                <div className=' items-start flex gap-2'>
                                    <h3>Draft:  {techInformation[0].draft}</h3>
                                    <h3>| Cruising Speed:  {techInformation[0].cruising}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-10 mb-10'>
                        <div className='w-full h-full'>
                            <div className='mx-3 md:mx-[186px]'>
                                <TechInfoSlider images={techInformation[0].images} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default TechnicalInformation;