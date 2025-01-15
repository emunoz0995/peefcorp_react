import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
//UI
import { FaCheck } from 'react-icons/fa';
import InputForm from '../Inputs/formInput/InputForm';
import TextAreaForm from '../Inputs/formInput/TextAreaForm';
//SLICES
import { PRIVACY_POLITICS_URL } from '../../store/constans';
import { createLeadThunk, initialStateLead } from '../../store/slices/pages/leads.slice';
import { countries } from '../../resources/optionsList';

const Modal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const leadState = useSelector(state => state.leads);
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        return () => {
            dispatch(initialStateLead())
        }
    }, [])

    useEffect(() => {
        if (leadState.message === "resource created successfully" || leadState.message === "Validation error") {
            const timer = setTimeout(() => {
                closeModal();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [leadState, dispatch, reset]);

    const onSubmit = (data) => {
        dispatch(createLeadThunk(data));
    };
    const emailValid = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,)

    const closeModal = () => {
        onClose();
        reset();
    }
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm flex items-center justify-center z-20  ">
            <div className="modal-box p-5 max-w-xl max-h-full contenedor z-30 bg-white rounded-md">
                <button onClick={closeModal} className="z-20 border-none text-gray-700 btn btn-sm btn-circle bg-rose-200  hover:bg-rose-400 absolute right-2 top-2">✕</button>
                <form onSubmit={handleSubmit(onSubmit)} className='text-gray-700 p-3 '>
                    <div className='flex flex-col gap-1 w-full items-center justify-center '>
                        <h1 className='text-[#44b3ab] text-center text-[30px] font-bold'>Tu Viaje Empieza Aquí!</h1>
                        <p className='text-center text-[18px] text-[#326d7d]'>Llena este formulario para poder brindarte una asistencia personalizada y poder contactarnos contigo.</p>
                        <p className=' text-[20px] text-[#326d7d] font-bold'>Vive una experiencia Tip Top.</p>
                        <div className='flex flex-col w-full  '>
                            <div className='flex flex-col md:flex-row gap-2 px-2'>
                                <InputForm
                                    spam={true}
                                    label={t("user_name")}
                                    input="input"
                                    type="text"
                                    cols={1}
                                    register={register("firstName", { required: true })}
                                    placeholder={t("user_name")}
                                    errors={errors.firstName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    spam={true}
                                    label={t("user_lastName")}
                                    type="text"
                                    input="input"
                                    cols={1}
                                    register={register("lastName", { required: true })}
                                    placeholder={t("user_lastName")}
                                    errors={errors.lastName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 px-2'>
                                <InputForm
                                    type="text"
                                    label={t("user_email")}
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("email", { required: true, pattern: emailValid })}
                                    placeholder={t("user_email")}
                                    errors={errors.email && errors.email.type === "required" && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                    errorsTwo={errors.email && errors.email.type === "pattern" && (<span className="text-red-500 text-xs">{t("user_error")}</span>)}
                                />
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 px-2'>
                                <div className='flex flex-col text-start md:w-[50%] cols'>
                                    <label className="text-sm flex items-center m-1 font-semibold">
                                        <p>Pais</p>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select className='bg-slate-200 outline-none input-bordered file-input-sm file-input-info file-input-bordered focus:outline-none focus:ring-1 rounded-md shadow-base-400 shadow-lg' {...register("country", { required: true })} >
                                        <option value=""></option>
                                        {
                                            countries.map(country => (
                                                <option key={country.name} className="text-gray-500" value={country.name}>{country.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.country && (<span className="text-red-500 text-xs">{"required information"}</span>)}
                                </div>
                                <InputForm
                                    spam={true}
                                    label={t("Número de contacto")}
                                    input="input"
                                    type="text"
                                    cols={1}
                                    register={register("phone", { required: true })}
                                    errors={errors.phone && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 px-2'>
                                <TextAreaForm
                                    spam={true}
                                    label={t("Mensaje")}
                                    input="input"
                                    type="text"
                                    cols={1}
                                    register={register("message", { required: true })}
                                    errors={errors.message && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex flex-col py-3'>
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
                                <div className='w-full flex justify-center py-3'>
                                    {leadState.fetching ?
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className="loading loading-ring loading-lg"></span>
                                            <h1>Enviando ...</h1>
                                        </div>
                                        :
                                        <button
                                            className=' text-white text-[15px] md:text-[15px] bg-[#44b3ab] uppercase border px-8 py-2 font-bold rounded-full hover:text-white hover:bg-[#326d7d] duration-75 hover:border-white'>
                                            Enviar
                                        </button>
                                    }
                                </div>
                    }
                </form>
            </div>
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        </div>,
        document.body
    );
};

const BookNowAvailabilityModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="p-4">
            <button className="border border-[#326d7d] py-1 px-2 text-gray-700" onClick={openModal}>
                Reserva ahora
            </button>

            <Modal isOpen={isOpen} onClose={closeModal} />
        </div>
    );
};

export default BookNowAvailabilityModal;
