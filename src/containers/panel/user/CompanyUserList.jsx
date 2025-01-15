import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
//SLICE

import { deleteUserThunk, getUsersThunk } from '../../../store/slices/catalogs/users.slice';
import Error from '../../../components/errors/Error';


const CompanyUserList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsersThunk());
    }, []);

    if (userState.message === "resource deleted successfully") {
        dispatch(getUsersThunk());
    }

    const handledeleteUser = (user_id) => {
        dispatch(deleteUserThunk(user_id));
    };

    return (
           <HomeLayout>
            {userState.fetching || userState.processing ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full '>
                    {userState.error ? <Error state={userState.error}/> : " "}
                    <HeaderSimple title={t("user_title")} to={`/panel/users_new`} />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm w-full text-start">
                            <thead className='border-t-2 border-t-[#2c6a80] bg-sky-600/20' >
                                <tr className='text-left h-[50px] bg-[#c2c2c2]/20'>
                                    <th className='w-[25px]'></th>
                                    <th>{t("user_name")}</th>
                                    <th>{t("user_email")}</th>
                                    <th>{t("user_role")}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userState.users.map(user => (
                                    <tr className='h-[50px] border-b-[2px] border-white' key={user.id}>
                                        <td className='p-2'><IconStatus active={user.active} /></td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.user_rol?.name}</td>
                                        <td>
                                            <div className='flex gap-1 justify-end items-center h-[50px] p-2'>
                                                <BtnTable action="edit" to={`/panel/users/${user.id}`} />
                                                <BtnTable title={t("user_delete")} action="delete" onclick={() => handledeleteUser(user.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default CompanyUserList;