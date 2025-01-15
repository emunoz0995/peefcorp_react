import React from 'react';
import { API_BASE_URL } from '../../store/constans';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../../assets/css/sliders.css';

// import required modules
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const GustsAccomodationSlider = ({ images }) => {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            loop={true}
            effect="fade"
            speed={2000}
            className='h-[400px] md:h-screen max-w-[750px]'
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} >
                    <div className={`flex transition-all h-full bg-cover bg-center`} style={{ backgroundImage: `url(${API_BASE_URL}${image})` }}>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GustsAccomodationSlider;