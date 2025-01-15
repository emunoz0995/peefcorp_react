import React, { useEffect, useState } from 'react';
import { FaFileDownload, FaLifeRing } from 'react-icons/fa';
import MainLoader from '../Loaders/MainLoader';
import GustsAccomodationSlider from '../sliders/GustsAccomodationSlider';
import FullScreenSlider from '../sliders/FullScreenSlider';
import { useDispatch } from 'react-redux';
import { donwloadFileThunk } from '../../store/slices/donwloadFile.slice';


const GuestAccommodation = ({ guestsAccomodation, fullScreenGalery, decks, file }) => {
    const dispatch = useDispatch();

    function getFileNameFromPath(path) {
        return path.split('/').pop();
    }

    const handleDownload = (file) => {
        dispatch(donwloadFileThunk(file))
    };

    const [mainDecks, setMainDecks] = useState([])
    const [lowerDecks, setLowerDecks] = useState([])
    const [upperDecks, setMUpperDecks] = useState([])

    useEffect(() => {
        if (decks !== undefined) {
            setMainDecks(decks.filter(deck => deck.type === 'MainDeck'));
            setLowerDecks(decks.filter(deck => deck.type === 'LowerDeck'));
            setMUpperDecks(decks.filter(deck => deck.type === 'UpperDeck'));
        }
    }, [])

    return (
        <>
            {guestsAccomodation === undefined || file === undefined || file === undefined || decks === undefined ?
                <MainLoader /> :
                <div className='flex flex-col mt-[-90px] md:mt-0'>
                    <div className='bg-white flex flex-col md:flex-row h-full w-full md:px-24 px-3'>
                        <div className='bg-white flex flex-col md:w-[50%] p-3 gap-5 mr-5'>
                            <div className='text-[19px] md:text-[22px] text-[#2e6a82] w-full flex flex-col font-semibold'>
                                <div  className='text-start duration-75'>
                                    <h3 className='tracking-tight'>G U E S T</h3>
                                    <div className='flex gap-3 items-center'>
                                        <h3 className='tracking-wide'>A C C O M M O D A T I O N</h3>
                                        {/* <FaFileDownload /> */}
                                    </div>
                                </div>
                            </div>
                            {mainDecks.length > 0 ?
                                <div className='text-[15px] mb-5 text-[#2e6a82] w-full flex flex-col p-2 shadow-md shadow-gray-300'>
                                    <div className='text-start flex flex-col gap-3'>
                                        <div className='bg-[#F29100] text-white p-1 max-w-24 flex justify-center h-5 items-center'>
                                            <h1 className='text-[12px] font-semibold'>MAIN DECK</h1>
                                        </div>
                                        {mainDecks.map(deck => (
                                            <div key={deck.id} className='text-[14px]'>
                                                <h1 className='font-semibold'>
                                                    {deck.title}
                                                </h1>
                                                {
                                                    deck.coments.map((coment, index) => (
                                                        <p key={index} className='font-sans'>{coment}</p>
                                                    ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div> : ""
                            }
                            {lowerDecks.length > 0 ?
                                <div className='text-[15px] mb-5 text-[#2e6a82] w-full flex flex-col p-2 shadow-md shadow-gray-300'>
                                    <div className='text-start flex flex-col gap-3'>
                                        <div className='bg-[#F29100] text-white p-1 max-w-24 flex justify-center h-5 items-center'>
                                            <h1 className='text-[12px] font-semibold'>LOWER DECK</h1>
                                        </div>
                                        {lowerDecks.map(deck => (
                                            <div key={deck.id} className='text-[14px]'>
                                                <h1 className='font-semibold'>
                                                    {deck.title}
                                                </h1>
                                                {
                                                    deck.coments.map((coment, index) => (
                                                        <p key={index} className='font-sans'>{coment}</p>
                                                    ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div> : ""
                            }
                            {upperDecks.length > 0 ?
                                <div className='text-[15px] mb-5 text-[#2e6a82] w-full flex flex-col p-2 shadow-md shadow-gray-300'>

                                    <div className='text-start flex flex-col gap-3'>
                                        <div className='bg-[#F29100] text-white p-1 max-w-24 flex justify-center h-5 items-center'>
                                            <h1 className='text-[12px] font-semibold'>UPPER DECK</h1>
                                        </div>
                                        {upperDecks.map(deck => (
                                            <div key={deck.id} className='text-[14px]'>
                                                <h1 className='font-semibold'>
                                                    {deck.title}
                                                </h1>
                                                {
                                                    deck.coments.map((coment, index) => (
                                                        <p key={index} className='font-sans'>{coment}</p>
                                                    ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div> : ""
                            }
                            <div className='text-[15px] mt-[-20px] text-[#2e6a82] w-full flex flex-col p-2'>
                                <div className='text-start flex flex-col gap-3'>
                                    <div className='text-[14px]'>
                                        <h1 className='font-semibold'>
                                            EACH CABIN HAS:
                                        </h1>
                                        <div className='flex flex-col gap-1 items-start'>
                                            {guestsAccomodation[0].areas.map((area,index) => (
                                                <div key={index} className='flex gap-3 justify-center items-center'>
                                                    <FaLifeRing />
                                                    <p className='font-sans'>{area}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center gap-10 mb-10 md:w-[50%] md:p-2 '>
                            <div className='w-full h-full'>
                                <GustsAccomodationSlider images={guestsAccomodation[0].images} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-10 mt-10 w-full h-full '>
                        <div className='w-full h-full'>
                            <FullScreenSlider images={fullScreenGalery[0].images} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GuestAccommodation;