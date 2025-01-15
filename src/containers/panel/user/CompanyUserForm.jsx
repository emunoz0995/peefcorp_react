import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import BtnContent from '../../../components/buttons/BtnContent';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';

//SLICES
import { getRolesThunk } from '../../../store/slices/catalogs/roles.slice';
import { getUserThunk, initialStateUser, updateUserThunk, createUserThunk } from '../../../store/slices/catalogs/users.slice';
import DropdownForm from '../../../components/Inputs/formInput/DropdonwForm';
import Error from '../../../components/errors/Error';


const CompanyUserForm = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();
    let { user_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const userState = useSelector((state) => state.users);
    const roleState = useSelector((state) => state.roles);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRolesThunk());
        if (user_id) {
            dispatch(getUserThunk(user_id));
        }
        return () => {
            dispatch(initialStateUser());
        };
    }, []);

    const onSubmit = (data) => {
        if (user_id) {
            dispatch(updateUserThunk(user_id, data));
        } else {
            dispatch(createUserThunk(data));
        }
    };

    if (userState.message === "resource created successfully" || userState.message === "resource updated successfully") {
        navigate(`/panel/users`);
    }

    const emailValid = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,)

    if (Object.keys(userState.user).length !== 0) {
        setValue('firstName', userState.user?.first_name)
        setValue('lastName', userState.user?.last_name)
        setValue('email', userState.user?.email)
        setValue('roleId', userState.user?.role_id)
        setValue('active', userState.user?.active)
    }

    return (
        <HomeLayout>
            
            {userState.fetching || userState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    {userState.error ? <Error state={userState.error}/> : " "}
                    <HeaderForm title={user_id ? "Editar usuario" : "Nuevo usuario" } />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
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
                            <div className='flex gap-2 p-2'>
                                <DropdownForm
                                    label={t("user_role")}
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("roleId", { required: true })}
                                    options={roleState.roles}
                                    errors={errors.roleId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="checkbox"
                                    label={t("active_tag")}
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("active")}
                                />
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">{t("save_button")}</BtnContent>
                                <BtnContent cancel={true} to={`/panel/users`}>{t("canceled_button")}</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default CompanyUserForm;