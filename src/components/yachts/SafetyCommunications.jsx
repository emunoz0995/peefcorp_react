import React from 'react';
import Slider from 'react-slick';
import { FaBootstrap, FaFileDownload, FaLifeRing } from 'react-icons/fa';
import ImageCard from '../cards/ImageCard';
import MainLoader from '../Loaders/MainLoader';
import { donwloadFileThunk } from '../../store/slices/donwloadFile.slice';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../../store/constans';


const SafetyCommunications = ({ safetyCommunication, mechanicEquipment, deckPlans, file }) => {

    const dispatch = useDispatch();

    function getFileNameFromPath(path) {
        return path.split('/').pop();
    }

    const handleDownload = (filename) => {
        dispatch(donwloadFileThunk(filename))
    };

    return (
        <div className='flex flex-col pt-10'>
            {safetyCommunication === undefined || mechanicEquipment === undefined ?
                <MainLoader /> :
                <div className='bg-white flex flex-col md:flex-row h-full w-full md:px-24 px-3'>
                    <div className='bg-white flex flex-col md:w-[65%] p-3 gap-5 mr-5'>
                        <div className='text-[22px] text-[#2e6a82] w-full flex flex-col font-semibold'>
                            <div className='text-start duration-75'>
                                <h3 className='tracking-3'>SAFETY &</h3>
                                <div className='flex gap-3 items-center'>
                                    <h3 className='tracking-3'>COMMUNICATIONS</h3>
                                    {/* <FaFileDownload /> */}
                                </div>
                            </div>
                        </div>
                        <div className='text-[15px] mt-[-20px] text-[#2e6a82] w-full flex flex-col p-2'>
                            <div className='text-start flex flex-col gap-3'>
                                <div className='text-[14px]'>
                                    <div className='flex flex-col gap-1 items-start'>
                                        {safetyCommunication[0].commets.map((coment, index) => (
                                            <div key={index} className='flex gap-3 items-center mb-3'>
                                                <div>
                                                    <FaLifeRing />
                                                </div>
                                                <div>
                                                    <p className='font-sans'>{coment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-[22px] text-[#2e6a82] w-full flex flex-col font-semibold'>
                            <div className='text-start duration-75'>
                                <h3 className='tracking-3'>MECHANIC</h3>
                                <div className='flex gap-3 items-center'>
                                    <h3 className='tracking-3'>EQUIPMENT</h3>
                                    {/* <FaFileDownload /> */}
                                </div>
                            </div>
                        </div>
                        <div className='text-[15px] mt-[-20px] text-[#2e6a82] w-full flex flex-col p-2'>
                            <div className='text-start flex flex-col gap-3'>
                                <div className='text-[14px]'>
                                    <div className='flex flex-col gap-1 items-start'>
                                        {mechanicEquipment[0].commets.map((coment, index) => (
                                            <div key={index} className='flex gap-3 items-center mb-3'>
                                                <div>
                                                    <FaLifeRing />
                                                </div>
                                                <div>
                                                    <p className='font-sans'>{coment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-10 mb-10 md:w-[35%] p-2 font-semibold'>
                        <div className='text-[22px] text-[#2e6a82] w-full flex '>
                            <button onClick={() => handleDownload(getFileNameFromPath(deckPlans[0]?.rwFile))} className='text-start hover:text-[#f29100] duration-75 flex items-center gap-2'>
                                <h3 className='tracking-3'>DECK PLAN</h3> <FaFileDownload />
                            </button>
                        </div>
                        <div className='w-full h-full'>
                            <ImageCard src={`${API_BASE_URL}${deckPlans[0]?.rwImage}`} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SafetyCommunications;