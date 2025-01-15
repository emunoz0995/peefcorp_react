import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../assets/css/sliders.css';

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';

const OurHistoryPanelSlider = ({ images }) => {

    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            loop={true}
            effect="fade"
            speed={2000}
            className='w-16 h-14'
        >
            {images?.map((image, index) => (
                <SwiperSlide key={index} >
                    <img className='rounded-full w-16 h-14' src={`${API_BASE_URL}${image.image}`} alt={image.name} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default OurHistoryPanelSlider;