import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
//UI
import logo from '../../assets/teck_logo.png';
import { FaArrowLeft } from 'react-icons/fa';
//TRASLATION
import { useTranslation } from "react-i18next";
//SLICE
import { ForgotPasswordUser } from '../../store/slices/catalogs/users.slice';


const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userState = useSelector(state => state.users)
    const onSubmit = (data) => {
        dispatch(ForgotPasswordUser(data));
    };

    return (
        <div
            className={`text-gray-600 flex justify-start items-center 2xl:items-center transition-all h-full w-full min-h-screen bg-cover bg-center bg-[url('../src/assets/img4.png')]`}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/40 "></div>
            <div className="w-full font-sans h-screen transition-all sm:w-2/3 md:w-[35%]  bg-[#ddd3d39a] backdrop-blur-lg shadow-md shadow-gray-800 flex flex-col items-center justify-center">
                {userState.message === "password updated successfully" ?
                    <>
                        <div className='flex flex-col p-2 w-[80%] border-green-500 rounded-md border bg-green-200 mt-10'>
                            <h1 className="text-center font-semibold text-[14px] mb-5">Se ha enviado un email a la dirección de correo electrónico ingresada, con una contraseña temporal con la que podrás iniciar sesión y restablecer tu contraseña</h1>
                            <div className='pl-2 text-[13px]'>
                                <p className='mb-0'>Nota: Si no encuentras nuestro email en tu bandeja de entrada, por favor revisa la bandeja de spam o correo no deseado</p>
                            </div>
                        </div>
                        <div className='flex gap-2 w-[100%] my-10 justify-center'>
                            <h1 className="text-[14px] flex gap-2"><Link to={'/panel'}><p className='text-green-700 hover:text-green-800 flex items-center gap-1'><FaArrowLeft /> Iniciar sesión</p> </Link></h1>
                        </div>
                    </> :
                    <>
                        <div className='flex flex-col text-[15px] text-green-800 text-center gap-2 w-[75%] mb-10'>
                            <h1 className="text-[18px] font-semibold ">¿Olvidaste tu contraseña?</h1>
                            <p>Ingrese la dirección de correo electrónico asociada con su cuenta y le enviaremos un enlace por correo electrónico para restablecer su contraseña.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 max-w-xs mx-auto mb-16">
                            <div className="relative flex flex-col mt-8">
                                <input className={'w-full placeholder-gray-800 p-2 rounded-xl focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]'}
                                    type='text'
                                    {...register("email", { required: true })}
                                    placeholder="Email"
                                />
                            </div>
                            {errors.email && <span className="text-red-600 text-xs pl-2">{t("required_information")}</span>}
                            <button type="submit" className="btn shadow-lg btn-block bg-green-700 hover:bg-green-800 border-none rounded-md mt-16 text-white">
                                Restablecer contraseña
                            </button>
                            <div className='flex gap-2 w-[100%] mt-5 justify-center'>
                                <h1 className="text-[14px] flex gap-2"><Link to={'/panel'}><p className='text-green-700 hover:text-green-800 flex items-center gap-1'><FaArrowLeft /> Iniciar sesión</p> </Link></h1>
                            </div>
                        </form>
                    </>}
            </div >
            <div className="absolute left-[25%] top-[5%] md:left-[87%] md:top-[80%] w-[160px] md:w-[150px] h-[20px] z-10">
                <img src={logo} alt="logo" />
            </div>
        </div >
    );
};

export default ForgotPasswordForm;