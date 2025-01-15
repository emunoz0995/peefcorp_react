import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
//UI
import logo from '../../assets/teck_logo.png';
import ShowPassword from '../../components/Inputs/ShowPassword';
//TRASLATION
import { useTranslation } from "react-i18next";
//ACTIONS
import { upgradePassword } from '../../store/slices/catalogs/users.slice';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();
  let { user_id } = useParams();
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const { getValues, register, handleSubmit, formState: { errors } } = useForm();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] = useState(true);
  const [comparePass, setComparePass] = useState(true)
  const userState = useSelector(state => state.users)

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      dispatch(upgradePassword(user_id, data));
    }
  };

  function comparePassword(event) {
    const confirmPass = event.target.value
    if (getValues("password") !== confirmPass) {
      setComparePass(false)
    } else {
      setComparePass(true)
    }
  }

  if (userState.message === "password updated successfully") {
    setTimeout(() => {
      navigate("/panel");
    }, 4000);
  }

  return (
    <div
      className={`text-gray-600 flex justify-start items-center 2xl:items-center transition-all h-full w-full min-h-screen bg-cover bg-center bg-[url('../src/assets/img4.png')]`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/40 "></div>
      <div className="w-full h-screen transition-all sm:w-2/3 md:w-[35%]  bg-[#ddd3d39a] backdrop-blur-lg shadow-lg shadow-gray-500 flex flex-col items-center justify-center">
        <div className='flex flex-col gap-2 w-[85%] mt-14'>
          <h1 className="text-center text-[24px] font-semibold text-green-800 ">Antes de comenzar debe restablecer su contraseña</h1>
        </div>
        <div className='flex font-sans flex-col p-2 w-[85%]  border-green-500 text-green-800 rounded-md border mt-6 bg-green-200'>
          {userState.message === "password updated successfully" ?
            <>
              <h1 className="text-left mb-0">Success!</h1>
              <p className='text-left text-sm mb-0'>Su contraseña se actualizó correctamente</p>
            </> :
            <>
              <h1 className="text-left text-[14px] mb-0 font-semibold">Importante! Su nueva contraseña debe cumplir con lo siguiente:</h1>
              <div className='pl-1 text-[13px] text-start'>
                <p className='mb-0'>- Contener al menos una mayúscula, una minúscula y un número</p>
                <p className='mb-0'>- Mínimo 6 caracteres</p>
                <p className='mb-0'>- Máximo 14 caracteres</p>
              </div>
            </>
          }
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 font-sans max-w-xs mx-auto mb-16">
          <div className='flex flex-col'>
            <div className="relative flex flex-col mt-8">
              <input className={'w-full placeholder-gray-800 p-2 rounded-xl focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]'}
                type={isPasswordHidden ? 'password' : 'text'}
                {...register("password", { required: true, pattern: regex, minLength: 6, maxLength: 14 })}
                placeholder="Contraseña"
              />
              <ShowPassword
                isPasswordHidden={isPasswordHidden}
                setIsPasswordHidden={setIsPasswordHidden}
              />
            </div>
            {errors.password && errors.password.type === "required" && <span className="text-red-600 text-xs pl-2">{t("required_information")}</span>}
            {errors.password && errors.password.type === "pattern" && <span className="text-red-600 text-xs pl-2">{t("change_password_not_comply")}</span>}
            {errors.password && errors.password.type === "minLength" && <span className="text-red-600 text-xs pl-2">{t("change_password_minimum_six_characters")}</span>}
            {errors.password && errors.password.type === "maxLength" && <span className="text-red-600 text-xs pl-2">{t("change_password_maximum_fourteen_characters")}</span>}
            <div className="relative flex flex-col mt-8">
              <input className={'w-full placeholder-gray-800 p-2 rounded-xl focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]'}
                type={isPasswordConfirmHidden ? 'password' : 'text'}
                {...register("confirmPassword", { required: true })}
                placeholder="Confirme contraseña"
                onChange={comparePassword}
              />
              <ShowPassword
                isPasswordHidden={isPasswordConfirmHidden}
                setIsPasswordHidden={setIsPasswordConfirmHidden}
              />
            </div>
            {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className="text-red-600 text-xs pl-2">{t("required_information")}</span>}
            {!comparePass && <span className="text-red-600 text-xs pl-2">{t("change_password_passwords_donot_match")}</span>}
          </div>
          <div className='flex w-full justify-center h-[35px] mt-10'>
            <button type=" submit" className="btn shadow-lg w-[70%] bg-green-700 hover:bg-green-800 hover:duration-75 border-none rounded-md  text-white">
              Restablecer contraseña
            </button>
          </div>
        </form>
      </div >
      <div className="absolute left-[25%] top-[5%] md:left-[87%] md:top-[80%] w-[160px] md:w-[150px] h-[20px] z-10">
        <img src={logo} alt="logo" />
      </div>
    </div >
  );
};

export default ChangePasswordForm;