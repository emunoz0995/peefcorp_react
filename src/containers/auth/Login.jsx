import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk, initialStateUser } from '../../store/slices/catalogs/users.slice';
//UI
import ShowPassword from '../../components/Inputs/ShowPassword';
import logo from '../../assets/teck_logo.png';
import UserLogo from '../../components/Inputs/UserLogo';

const Login = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const userState = useSelector(state => state.users)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return (() => {
      dispatch(initialStateUser());
    })
  }, []);

  const submit = (data) => {
    dispatch(signInThunk(data));
  }

  if (Object.keys(userState.user).length !== 0) {
    let userInfo = {
      userName: userState.user.firstName + " " + userState.user.lastName,
      token: userState.user.token,
      role: userState.user.rol,
      id: userState.user.id,
    };
    if (userState.user.changePassword) {
      navigate(`/changePassword/${userState.user.id}`)
    } else {
      if (userState.user.rol === 'marketing' || userState.user.rol === 'admin') {
        navigate("/panel/inicio");
      } else if (userState.user.rol === 'sales'){
        navigate("/panel/leads");
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }

  return (
    <div
      className={`text-gray-600 flex justify-start items-center 2xl:items-center transition-all h-full w-full min-h-screen bg-cover bg-center bg-[url('../src/assets/img4.png')]`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-800/40 "></div>
      <div className="w-full h-screen transition-all sm:w-2/3 md:w-[35%]  bg-[#ddd3d39a] backdrop-blur-lg shadow-lg shadow-gray-500 flex flex-col items-center justify-center">
        <div className='flex flex-col gap-2 mt-10'>
          <h1 className="text-center text-[34px] font-semibold mb-0 text-green-700">¡Bienvenido!</h1>
        </div>
        {userState.error === "user or password incorrect" || userState.error === "resource not found" ?
          <>
            <div className='flex p-2 gap-1 text-left text-sm font-sans w-[80%] border-red-500 rounded-md border mt-6 bg-red-200 items-center'>
              <h1 className="mb-0">¡Error!</h1>
              <p className='mb-0'>{userState.error}</p>
            </div>
          </> : userState.error === "temporary password has expired" ?
            <>
              <div className='flex flex-col p-2 w-[80%] border-red-500 rounded-md border mt-6 bg-red-200'>
                <h1 className="text-left text-sm mb-0">Error!</h1>
                <div className='pl-2 text-sm'>
                  <p className='mb-0'>La contraseña temporal ha expirado. Por favor, solicite una nueva.</p>
                </div>
              </div>
            </> : ""}
        <form onSubmit={handleSubmit(submit)} className="w-[75%] mx-auto text-gray-600 my-10 font-sans">
          <div className='flex flex-col'>
            <div className="relative flex flex-col mt-8">
              <input className={'w-full placeholder-gray-600 p-2 rounded-xl focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]'}
                type='text'
                {...register("email", { required: true })}
                placeholder="Email"
              />
              <UserLogo />
            </div>
            {errors.email && (<span className="error_message">{"Información requerida"}</span>)}
            <div className="relative flex flex-col mt-8">
              <input className='w-full p-2 rounded-xl placeholder-gray-600 focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]'
                type={isPasswordHidden ? 'password' : 'text'}
                {...register("password", { required: true })}
                placeholder="Password"
              />
              <ShowPassword
                isPasswordHidden={isPasswordHidden}
                setIsPasswordHidden={setIsPasswordHidden}
              />
            </div>
            {errors.email && (<span className="text-red-600">{"Información requerida"}</span>)}
            <div className='flex gap-2 w-[100%] mt-2 justify-end'>
              <h1 className="text-[14px] flex gap-2"><Link to={'/forgotPassword'}><p className='text-gray-700 hover:text-green-800'>¿Has olvidado tu contraseña?</p> </Link></h1>
            </div>
          </div>
          <div className='flex w-full justify-center h-[35px] mt-10'>
            <button type=" submit" className="btn shadow-lg btn-block bg-green-700 hover:bg-green-800 hover:duration-75 border-none rounded-md  text-white">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
      <div className="absolute left-[25%] top-[5%] md:left-[87%] md:top-[80%] w-[160px] md:w-[150px] h-[20px] z-10">
        <img src={logo} alt="logo" />
      </div>
    </div >
  );
}
export default Login;