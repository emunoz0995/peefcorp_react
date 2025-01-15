import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { useNavigate } from 'react-router-dom';

const ServicesCard = ({ destinationState }) => {

    const navigate = useNavigate();

    const handleNavigate = (island) => {
        navigate(`/galapagos-islands/${island}`)
    }
    return (
        <div
            //onClick={() => handleNavigate(destinationState.name.toLowerCase())}
            className='h-[400px] flex flex-col justify-start rounded-sm  m-3'>
            <div className="md:h-[50%]  ">
                <img className='aspect-auto' src={API_BASE_URL + destinationState.image} alt={destinationState.name} />
            </div>
            <div className=" h-[50%] bg-[#1311118f] backdrop-blur-lg rounded-none ">
                <div className='p-3 h-[90%]'>
                    <div className='overflow-hidden text-white text-center h-full flex flex-col  justify-center gap-3'>
                        <h2 className="text-[20px]  uppercase font-semibold">{destinationState.name}</h2>
                        <p className="text-[15px] font-sans ">{destinationState.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;