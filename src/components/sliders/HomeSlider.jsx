import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../assets/css/sliders.css';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const HomeSlider = ({ images }) => {
    const navigate = useNavigate();
    const handleClick = (code) => {
        navigate(`/galapagos-cruises/${code}`)
    }

    return (
        <Swiper
            navigation={true} modules={[Navigation, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            loop={true}
            effect="slide"
            speed={3000}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className={`flex transition-all h-screen bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${image.image})` }}>
                        <div className="absolute z-0 top-0 left-0 w-full h-full bg-black/20"></div>
                        <div className='flex justify-start transition-all'>
                            <div className=' relative z-10 top-[430px] md:top-[350px] md:left-14 text-white px-5 md:px-0'>
                                <div className='flex flex-col gap-10'>
                                    <div className='flex flex-col item text-white gap-10 uppercase'>
                                        <h1 className='text-start 2xl:text-[40px] text-[40px] font-semibold'>{image.name}</h1>
                                        <div className='border-t-[5px] border-t-[#F29100] h-2'></div>
                                        <button onClick={() => (handleClick(image.code))}
                                            className='border boder-white rounded-full py-2 px-5 font-semibold uppercase hover:text-white hover:bg-orange-500 duration-75 hover:border-white'>view yacht
                                        </button>
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

export default HomeSlider;