import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../assets/css/sliders.css';

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';

const OurHistorySlider = ({ images }) => {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            loop={true}
            effect="fade"
            speed={2000}
            className="shadow-lg shadow-gray-500"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} >
                    <img className='w-full' src={`${API_BASE_URL}${image}`} alt={image} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default OurHistorySlider;