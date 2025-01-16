import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { createLeadThunk, initialStateLead } from '../../store/slices/pages/leads.slice';
import { useDispatch, useSelector } from 'react-redux';
import BtnMotion from '../buttons/BtnMotion';
import contact from '../../assets/it_services.png'
const ContactUs = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const leadState = useSelector(state => state.leads);

    const onSubmit = (data) => {
        dispatch(createLeadThunk(data));
    };

    useEffect(() => {
        if (leadState.message === "resource created successfully" || leadState.message === "Validation error") {
            const timer = setTimeout(() => {
                dispatch(initialStateLead());
                reset();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [leadState, dispatch, reset]);

    return (
        <div name='contact_us' className={`flex justify-center h-full p-5 md:py-20`}>
            <div className=' grid grid-cols-1 md:grid-cols-2 md:w-[80%] h-full '>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full md:p-5 flex flex-col justify-center'>
                    <div className='flex flex-col gap-2 text-start w-full items-center justify-center p-2 '>
                        <h1 className='text-[35px] text-black'>¿Cómo podemos ayudarte?</h1>
                        <p>Cuéntenos su problema y nos pondremos en contacto con usted lo antes posible.</p>
                        <div className='flex flex-col gap-3 w-full   '>
                            <div className='flex flex-col md:flex-row gap-3 2xl:gap-1 w-full justify-between'>
                                <input className='text-[15px] bg-transparent w-full border-2 rounded-md focus:outline-none p-2' type="text" {...register("firstName", { required: true })} placeholder='Nombre' />
                                {errors.firstName && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                            </div>
                            <div>
                                <input className='text-[15px] bg-transparent w-full border-2 rounded-md focus:outline-none p-2' type="text" {...register("lastName", { required: true })} placeholder='Apellido' />
                                {errors.lastName && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                            </div>
                            <div className='flex flex-col'>
                                <input className='text-[15px] bg-transparent w-full border-2 rounded-md focus:outline-none p-2' type="text" {...register("phone", { required: true })} placeholder='Número de contacto' />
                                {errors.phone && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                            </div>
                            <div className='flex flex-col'>
                                <input className='text-[15px] bg-transparent w-full border-2 rounded-md focus:outline-none p-2' type="email" {...register("email", { required: true })} placeholder='Correo' />
                                {errors.email && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                            </div>
                            <div className='flex flex-col'>
                                <textarea className='text-[15px] bg-transparent w-full border-2 rounded-md focus:outline-none p-2' {...register("message", { required: true })} placeholder='Mensaje' />
                                {errors.message && (<span className="text-red-500 text-xs font-semibold">{"required information"}</span>)}
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-5'>
                                    <input type="checkbox" className=' cursor-pointer text-[15px] bg-transparent border-b-2  focus:outline-none' {...register("readPolitics", { required: true })} />
                                    <a className="hover:text-orange-600" href='#' target="_blank" rel="noopener noreferrer">
                                        <label className='text-[13px] '>Your privacy is of utmost importance to us. We respect your data, and all the information you share will be handled in compliance with our privacy policy.</label>
                                    </a>
                                </div>
                                {errors.readPolitics && (<span className="text-red-500 text-[13px] font-semibold">{"You must accept our privacy policies"}</span>)}
                            </div>
                        </div>
                    </div>
                    {
                        leadState.message === "Validation error" ?
                            <div className='bg-green-500/50 p-3 px-8 flex gap-3 items-center rounded-md text-black'>
                                <h1>You are already part of our community, an advisor will contact you immediately</h1>
                            </div>
                            :
                            leadState.message === "resource created successfully" ?
                                <div className='bg-green-500/50 p-3 px-8 flex gap-3 items-center rounded-md text-black'>
                                    <h1>Form send successfully</h1>
                                    <FaCheck />
                                </div>
                                :
                                <div className='w-full flex justify-center '>
                                    {leadState.fetching ?
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className="loading loading-ring loading-lg"></span>
                                            <h1>Sending</h1>
                                        </div>
                                        :
                                        <BtnMotion type={'submit'}>
                                            Enviar
                                        </BtnMotion>
                                    }
                                </div>
                    }
                </form>
                <div className='hidden md:flex h-full'>
                    <img src={contact} alt="contact-us" />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;