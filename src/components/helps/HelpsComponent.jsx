import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createLeadThunk, initialStateLead } from '../../store/slices/pages/leads.slice';

const HelpsComponent = () => {

    const dispatch = useDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const leadState = useSelector(state => state.leads);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const handleHistoyClick = () => {
        setPopupVisible(!popupVisible);
    };

    const onSubmit = (data) => {
        dispatch(createLeadThunk(data));
    };

    useEffect(() => {
        if (leadState.message === "resource created successfully" || leadState.message === "Validation error") {
            const timer = setTimeout(() => {
                dispatch(initialStateLead());
                handleHistoyClick()
                reset();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [leadState, dispatch, reset]);


    return (
        <div className='hidden z-20 md:flex md:gap-2 fixed right-0 bottom-1 p-3'>
            <a href='https://api.whatsapp.com/send/?phone=593995888870&text=Hola+me+interesa+contactarme+contigo&type=phone_number&app_absent=0' aria-label="Contact us to whastapp" target="_blank"
                className={`flex items-center gap-2 hover:duration-100 uppercase p-2 font-bold rounded-full text-white bg-green-500 duration-75 hover:border-white`}>
                <FaWhatsapp size={27} />
            </a>
            {/* <button
                onClick={handleHistoyClick}
                className={`${popupVisible ? 'hidden' : 'flex items-center gap-2 text-[15px] hover:text-[17px] hover:duration-100 uppercase px-3 py-1 font-bold rounded-full text-white bg-[#608c9cd1] duration-75 hover:border-white'}`}>
                <FaQuestionCircle />
                Ayuda
            </button> */}
            {/* <div className='hidden md:flex fixed flex-col top-[20%] 2xl:top-[18%] right-0 '>
                <div className={`flex items-center mr-[-500px] ${popupVisible ? 'mr-[10px]' : ''} duration-700 history`}>
                    <div className="bg-[#070707b9] p-2 shadow-md rounded-md w-[500px] ">
                        <div className='flex flex-col w-full p-2 gap-2 h-[450px] 2xl:h-[550px] overflow-scroll contenedor'>
                            <button onClick={handleHistoyClick} className="relative top-0 left-[430px] z-20 border-none text-white btn btn-sm btn-circle bg-transparent hover:bg-rose-300 ">✕</button>
                            <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
                                <div className='flex flex-col gap-3 text-start w-full items-center justify-center'>
                                    <div className='flex flex-col gap-5 w-full  '>
                                        <div className='flex flex-col md:flex-row gap-3 2xl:gap-1 w-full justify-between'>
                                            <input className='bg-transparent w-full border-b-2  focus:outline-none' type="text" {...register("firstName", { required: true })} placeholder='Nombre' />
                                            {errors.firstName && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                                        </div>
                                        <div className='flex flex-col md:flex-row gap-3 2xl:gap-1 w-full justify-between'>
                                            <input className='bg-transparent w-full border-b-2  focus:outline-none' type="text" {...register("lastName", { required: true })} placeholder='Apellido' />
                                            {errors.lastName && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                                        </div>
                                        <div className='flex flex-col'>
                                            <input className='bg-transparent border-b-2  focus:outline-none' type="email" {...register("email", { required: true })} placeholder='E-mail' />
                                            {errors.email && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                                        </div>
                                        <div className='flex flex-col'>
                                            <input className='bg-transparent border-b-2  focus:outline-none' type="text" {...register("phone", { required: true })} placeholder='Numero de contacto' />
                                            {errors.phone && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                                        </div>
                                        <div className='flex flex-col'>
                                            <textarea className='bg-transparent border-b-2  focus:outline-none' {...register("message", { required: true })} placeholder='Mensaje' />
                                            {errors.message && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex gap-5'>
                                                <input type="checkbox" className=' cursor-pointer text-[20px] bg-transparent border-b-2  focus:outline-none' {...register("readPolitics", { required: true })} />
                                                <a className="hover:text-orange-600" href={PRIVACY_POLITICS_URL} target="_blank" rel="noopener noreferrer">
                                                    <label className='text-[11px]'>Su privacidad es de suma importancia para nosotros. Respetamos tus datos y toda la información que compartas será manejada de conformidad con nuestra política de privacidad.</label>
                                                </a>
                                            </div>
                                            {errors.readPolitics && (<span className="text-red-500 text-[11px] font-semibold">{"You must accept our privacy policies"}</span>)}
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex gap-5'>
                                                <input type="checkbox" className=' cursor-pointer text-[20px] bg-transparent border-b-2  focus:outline-none' {...register("isSuscriptor")} />
                                                <label className='text-[11px]'>Suscríbete a nuestras noticias.</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    leadState.message === "Validation error" ?
                                        <div className='bg-green-500/50 p-3 px-8 flex gap-3 items-center rounded-md'>
                                            <h1>Ya eres parte de nuestra comunidad, un asesor se comunicará contigo de inmediato.</h1>
                                        </div>
                                        :
                                        leadState.message === "resource created successfully" ?
                                            <div className='bg-green-500/50 p-3 px-8 flex gap-3 items-center rounded-md'>
                                                <h1>Formulario enviado correctamente</h1>
                                                <FaCheck />
                                            </div>
                                            :
                                            <div className='w-full flex justify-center '>
                                                {leadState.fetching ?
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <span className="loading loading-ring loading-lg"></span>
                                                        <h1>Enviando ...</h1>
                                                    </div>
                                                    :
                                                    <button
                                                        className=' text-[15px] md:text-[15px] uppercase border px-8 py-2 font-bold rounded-full hover:text-white hover:bg-orange-500 duration-75 hover:border-white'>
                                                        Enviar
                                                    </button>
                                                }
                                            </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default HelpsComponent;