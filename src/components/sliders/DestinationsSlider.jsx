import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { Swiper, SwiperSlide } from 'swiper/react';
import food from '../../assets/icons/food.svg';
import activities from '../../assets/icons/activities.svg';
import hosting from '../../assets/icons/hosting.svg';
import transport from '../../assets/icons/transport.svg';
import BookNowAvailabilityModal from '../modals/BookNowAvailabilityModal';
import { FaBottleWater } from 'react-icons/fa6';
import { GiFireplace } from "react-icons/gi";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '../../assets/css/sliders.css';

// import required modules
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

const DestinationsSlider = ({ itineraries }) => {

    return (
        <Swiper
            modules={[Autoplay, Navigation]}
            navigation={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            speed={3500}
            className='flex h-auto justify-center items-center pl-11 py-8'
        >
            {itineraries.map((itinerary,) => (
                <SwiperSlide key={itinerary.id} >
                    <div className='md:w-[350px] w-[320px] h-auto rounded-md shadow-lg shadow-black cursor-pointer justify-between'>
                        <div
                            className='rounded-t-md bg-cover bg-center flex flex-col h-[250px] '
                            style={{ backgroundImage: `url(${API_BASE_URL + itinerary?.image})` }}>
                            <div className="bg-[#18677899]/50 p-3 rounded-t-md ">
                                <div className=''>
                                    <div className=' text-white text-start h-full flex flex-col justify-start gap-1'>
                                        <h2 className="text-[20px] uppercase font-semibold">{itinerary?.name}</h2>
                                        <p className="text-[15px] font-sans ">{itinerary?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-auto flex flex-col'>
                            <div className="bg-[#ececed] flex justify-between">
                                <div className='p-3 '>
                                    <div className='text-[#326d7d] text-start h-full flex flex-col justify-start gap-2 '>
                                        <h2 className="text-[15px]  uppercase font-semibold">{"incluye :"}</h2>
                                        <div className='flex flex-col gap-2 relative top-0'>
                                            {
                                                itinerary.servicesIncluded?.map(feed => (
                                                    <div className='flex gap-2'>
                                                        <img className='size-[25px]' src={feed === 'Alojamiento' ? hosting : feed === 'Traslados' ? transport : activities} alt={activities} />
                                                        <p className="text-[13px] font-bold ">{feed}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {itinerary.feeding.length === 1 && itinerary.feeding[0] === "" ? " " :
                                            <div className='flex flex-col gap-2 mb-[-15px]'>
                                                <div className='flex gap-2'>
                                                    <img className='size-[25px]' src={food} alt={food} />
                                                    <p className="text-[13px] font-bold ">{"Alimentación"}</p>
                                                </div>
                                                <div className='text-[11px] font-sans relative top-[-15px] left-8 gap-1'>
                                                    {
                                                        itinerary.feeding?.map(feed => (
                                                            <p>{"- " + feed}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {itinerary.activities.length === 1 && itinerary.activities[0] === "" ? " " :
                                            <div className='flex flex-col gap-2 mb-[-15px]'>
                                                <div className='flex gap-2'>
                                                    <GiFireplace className='size-[24px]' />
                                                    <p className="text-[13px] font-bold ">{"Actividades"}</p>
                                                </div>
                                                <div className='text-[11px] font-sans relative top-[-15px] left-8'>
                                                    {
                                                        itinerary.activities?.map(feed => (
                                                            <p>{"- " + feed}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {itinerary.courtesy.length === 1 && itinerary.courtesy[0] === "" ? " " :
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex gap-2'>
                                                    <FaBottleWater className='size-[24px]' />
                                                    <p className="text-[13px] font-bold ">{"Cortesía"}</p>
                                                </div>
                                                <div className='text-[11px] font-sans relative top-[-15px] left-8 gap-1'>
                                                    {
                                                        itinerary.courtesy?.map(feed => (
                                                            <p>{"- " + feed}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='p-3 h-auto flex flex-col justify-between'>
                                    <div className='text-[#326d7d] flex flex-col gap-2'>
                                        <h2 className="text-[15px] uppercase font-semibold">{"Salida desde :"}</h2>
                                        {
                                            itinerary?.departureFrom?.map(departure => (
                                                <p className="text-[13px] text-start font-sans pl-5 ">{departure}</p>
                                            ))
                                        }
                                    </div>
                                    <div className=' relative bottom-0'>
                                        <BookNowAvailabilityModal />
                                    </div>
                                </div>
                            </div>
                            <div className=" bg-[#44b3ab] rounded-b-md p-3 relative bottom-0">
                                <div className='flex gap-5 justify-center items-center'>
                                    <div className='text-white h-full w-[50%] flex flex-col justify-start'>
                                        <h2 className="text-[15px]  uppercase font-semibold">{"DISPONIBILIDAD:"}</h2>
                                        <p className="text-[13px] font-sans ">{itinerary?.avalability}</p>
                                    </div>
                                    <div className='overflow-hidden text-white h-full flex flex-col justify-start'>
                                        <h2 className="text-[15px]  uppercase font-semibold">{"DESDE:"}</h2>
                                        {
                                            itinerary.isOfert ?
                                                < div className='flex flex-col'>
                                                    <p className="text-[13px] line-through ">{itinerary?.price + " " + 'USD'}</p>
                                                    <p className="text-[20px] font-semibold mt-[-10px]">{itinerary?.ofertPrice + " " + 'USD'}</p>
                                                </div> :
                                                <p className="text-[20px] font-semibold ">{itinerary?.price + " " + 'USD'}</p>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default DestinationsSlider;