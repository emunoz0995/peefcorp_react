import React, { useState } from 'react';
import IslandsCardModal from '../cards/IslandsCardModal';
import { API_BASE_URL } from '../../store/constans';

const DestinationModal = ({ destination }) => {

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = (action) => {
        setOpenModal(action)
    }

    return (
        <>
            <i onClick={() => handleOpenModal(true)}
                style={{ position: 'relative', top: destination.yCoord, left: destination.xCoord }}
                className={`bg-orange-600 cursor-pointer rounded-full border-2 w-4 h-4 hover:bg-sky-800 duration-100`}
            >
            </i>
            <dialog id="my_modal_3" className={`bg-gray-600/40 backdrop-blur-sm fixed z-30 top-0 w-full h-screen justify-center ${openModal ? "flex" : "hidden"} `}>
                <div className="modal-box p-0 max-w-4xl max-h-max contenedor bg-fixed rounded-md">
                    <form method="dialog">
                        <button onClick={() => handleOpenModal(false)} className="z-20 border-none text-gray-700 btn btn-sm btn-circle bg-rose-200  hover:bg-rose-400 absolute right-2 top-2">✕</button>
                    </form>
                    <div className={`flex justify-start w-full transition-all h-full bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${destination?.image})` }}>
                        <div className="absolute z-0 top-0 left-0 w-full h-full bg-black/20"></div>
                        <div className='flex px-5 flex-col z-10 transition-all md:justify-end text-white pt-32 md:pb-10  w-full'>
                            <div className='bg-gray-800/50 p-5 rounded-md'>
                                <div className='border-b-[2px] border-b-orange-500 font-semibold'>
                                    <h1 className='font-semibol text-start text-[20px] uppercase'>{destination?.name}</h1>
                                </div>
                                <p className='font-sans text-start'>{destination?.description}</p>
                            </div>
                        </div>
                    </div>
                    {
                        (destination.sites)?.length > 0 ?
                            <div className='pt-[30px] h-full flex flex-col'>
                                <div className='px-8 mb-[-180px] md:mb-8'>
                                    <div className='border-b-[2px] border-b-orange-500 font-semibold'>
                                        <h1 className='font-semibol text-start text-[20px] text-[#2e6a82] uppercase'>Island Sites</h1>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-10 p-5 md:gap-5 '>
                                    {destination.sites?.map(destination => (
                                        <IslandsCardModal destinationState={destination} />
                                    ))}
                                </div>
                            </div>
                            : " "
                    }
                </div>
            </dialog>
        </>
    );
};

export default DestinationModal;