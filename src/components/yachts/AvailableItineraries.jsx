import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { FaFileDownload } from 'react-icons/fa';
import ItinerariesCards from '../cards/ItinerariesCards';
import { getItinerarysByYachtThunk, initialStateItinerary } from '../../store/slices/catalogs/itinerary.slice';
import { getCancelationPolicysThunk } from '../../store/slices/catalogs/cancelationPolicy.slice';
import { donwloadFileThunk } from '../../store/slices/donwloadFile.slice';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../Loaders/MainLoader';


const AvailableItineraries = ({ yachtId }) => {

    const dispatch = useDispatch();
    const itineraryState = useSelector(state => state.itineraries);
    const cancelationState = useSelector((state) => state.cancelationPolicy);

    useEffect(() => {
        dispatch(getItinerarysByYachtThunk(yachtId));
        dispatch(getCancelationPolicysThunk());
        return () => {
            dispatch(initialStateItinerary());
        }
    }, [yachtId]);

    function getFileNameFromPath(path) {
        return path.split('/').pop();
    }

    const handleDownload = (filename) => {
        dispatch(donwloadFileThunk(filename))
    };

    const settings = {
        cssEase: "linear",
        infinite: true,
        dots: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        customPaging: (i) => (
            <div className="custom-dot"></div>
        ),
        appendDots: (dots) => (
            <ul style={{ margin: "0px" }}> {dots} </ul>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]

    };

    return (
        <div className='flex flex-col gap-3 h-full justify-center w-full bg-[#f3f1f2]' >
            {itineraryState.fetching ?
                <MainLoader /> :
                <>
                    <div className='text-[#2e6a82] text-2xl h-[150px] flex justify-center items-center font-semibold'>
                        <h1>I T I N E R A R I E S</h1>
                    </div>
                    <div className='w-full px-5 md:px-10 h-full py-5'>
                        <Slider {...settings} className='h-[400px] flex justify-center items-center'>
                            {
                                itineraryState.itineraries?.map(itinerary => (
                                    <div key={itinerary.id}>
                                        <ItinerariesCards itineraryState={itinerary} />
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                    <div className='h-[150px] flex justify-center items-center font-semibold'>
                        <button onClick={() => handleDownload(getFileNameFromPath(cancelationState.cancelationPolicy[0]?.rwFile))} className='text-[15px] text-[#2e6a82] w-full flex flex-col justify-center items-center hover:text-[#f29100]  duration-75'>
                            <h3 className=' tracking-3'>DOWNLOAD OUR</h3>
                            <div className='flex gap-3 justify-center items-center'>
                                <h3 className=' tracking-3'>BOOKING & CANCELLATION POLICY</h3>
                                <FaFileDownload />
                            </div>
                        </button>
                    </div>
                </>
            }
        </div>


    );
};

export default AvailableItineraries;