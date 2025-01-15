import React, { useEffect, useState } from 'react';
import { FaLifeRing } from 'react-icons/fa';
import MainLoader from '../Loaders/MainLoader';
import SocialAreasSlider from '../sliders/SocialAreasSlider';
import { getCrewsByYachtThunk, initialStateYachtInformation } from '../../store/slices/yachts/yachtInfo.slice';
import { getCrewsThunk } from '../../store/slices/catalogs/crew.slice';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../../store/constans';

const SocialAreas = ({ socialAreas }) => {

    const dispatch = useDispatch();
    const [crewsOnBoard, setCrewsOnBoard] = useState([]);
    const crewsOnBoardState = useSelector((state) => state.yachtInformation);
    const crewsState = useSelector((state) => state.crews);

    useEffect(() => {
        dispatch(getCrewsByYachtThunk(socialAreas[0]?.yacht_id));
        dispatch(getCrewsThunk())
        return () => {
            dispatch(initialStateYachtInformation());
        };
    }, []);

    useEffect(() => {
        setCrewsOnBoard(crewsOnBoardState.yachtInformation.crews?.flatMap(crews => {
            return crewsState.crews.filter(crew => crew.name === crews)
        }).map(crew => ({
            name: crew.name,
            image: crew.image
        })))
    }, [crewsState])
    
    return (
        <div className='flex flex-col'>
            {socialAreas === undefined || crewsOnBoard === undefined ?
                <MainLoader /> : <>
                    <div className='bg-white flex flex-col md:flex-row h-full w-full md:py-20 md:px-24 px-3'>
                        <div className='bg-white flex flex-col md:w-[40%] p-3 gap-5 mr-5 justify-center'>
                            <div className='text-[22px] text-[#2e6a82] w-full flex flex-col gap-5 justify-center'>
                                <div className='font-semibold text-start duration-75'>
                                    <h3 className='tracking-4'>SOCIAL</h3>
                                    <div className='flex gap-3 items-center'>
                                        <h3 className='tracking-4'>AREAS</h3>
                                        {/* <FaFileDownload /> */}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 items-start text-[14px]'>
                                    {socialAreas.map((social) => (
                                        social.areas.map((area, index) => (
                                            <div key={index} className='flex gap-3 justify-center items-center'>
                                                <FaLifeRing />
                                                <p className='font-sans'>{area}</p>
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end gap-10 md:w-[60%] p-2 '>
                            <div className='w-full h-full'>
                                <SocialAreasSlider images={socialAreas[0].images} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-10 my-8 w-full h-full '>
                        <div className='w-full h-full'>
                            <div className=''>
                                <div className={`h-56 md:h-[400px] bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${crewsState.crews[0]?.image})` }}>
                                    <div className="relative z-0 top-0 left-0 w-full h-full bg-white/60">
                                        <div className='flex flex-col w-full h-full justify-center items-center text-[#2e6a82]'>
                                            <h3 className=' tracking-3 text-[38px] md:text-[75px] mt-[-55px] md:mt-0'>CREW MEMBERS</h3>
                                            <div className='w-full md:flex md:gap-8 md:justify-center grid grid-cols-5 px-3'>
                                                {
                                                    crewsOnBoard.map(crew => (
                                                        <div key={crew.name} className='h-10 w-10 md:h-24 md:w-24 gap-3 flex flex-col'>
                                                            <div className='flex justify-cent'>
                                                                <img className='text-center justify-center' src={`${API_BASE_URL}${crew.image}`} alt={crew.name} />
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <h1 className='text-center text-[12px] md:text-[18px]'>{crew.name}</h1>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default SocialAreas;