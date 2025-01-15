import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import HeaderSimpleII from '../../../components/headers/catalogs/HeaderSimpleII';
import MainLoader from '../../../components/Loaders/MainLoader';
//SLICE

import { getSalesUsersThunk } from '../../../store/slices/catalogs/users.slice';
import { getLeadsThunk, initialStateLead } from '../../../store/slices/pages/leads.slice';
import { initialStateProcedureLead } from '../../../store/slices/pages/proceduresLeads.slice';

import Error from '../../../components/errors/Error';
import LeadsSubMenu from '../../../components/submenus/LeadsSubMenu';
import { useNavigate } from 'react-router-dom';
import { formatDateToLocal } from '../../../utils/funtions';
import { FaCalendar, FaMailBulk, FaPhone, FaShip, FaUser } from 'react-icons/fa';


const LeadsList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const leadsState = useSelector(state => state.leads);
    const userState = useSelector(state => state.users);
    const procedureLeadsState = useSelector(state => state.proceduresLeads);
    const isLoading = useSelector(state => state.isLoadingSlice);


    useEffect(() => {
        dispatch(getLeadsThunk());
        dispatch(getSalesUsersThunk());
        return () => {
            dispatch(initialStateLead())
            dispatch(initialStateProcedureLead());
        }
    }, []);

    if (procedureLeadsState.message === "resource updated successfully") {
        dispatch(getLeadsThunk());
        dispatch(initialStateProcedureLead());
    }

    const handleNaviate = (leadId) => {
        navigate(`/panel/leads/${leadId}`)
    }

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full'>
                    {leadsState.error ? <Error state={leadsState.error} /> : " "}
                    <HeaderSimpleII title={t("Leads")} />
                    <div className="h-screen md:overflow-y-scroll md:h-[87%] contenedor">
                        <table className="text-[13px] table-sm w-full text-start">
                            <thead className='bg-sky-600/20 border-t-2 border-t-[#2c6a80]'>
                                <tr className='text-left h-[50px] bg-[#c2c2c2]/20'>
                                    <th className='w-[120px]'>{t("Fecha")}</th>
                                    <th className='w-[120px]'>{t("user_name")}</th>
                                    <th className='w-[400px]'>{t("Mensaje")}</th>
                                    <th>{t("user_email")}</th>
                                    <th>{t("Country")}</th>
                                    <th>{t("user_phone")}</th>
                                    <th className='w-[120px]'>{t("Agente")}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <thead className='md:hidden'>
                                <tr className='text-left h-[50px] bg-[#c2c2c2]/20'>
                                    <th>LEADS</th>
                                </tr>
                            </thead>
                            <tbody className='hidden md:contents'>
                                {leadsState.leads.map(lead => (
                                    <tr className='h-[50px] border-b-[2px] border-white cursor-pointer hover:bg-green-300/40 duration-100' key={lead.id}>
                                        <td onClick={() => handleNaviate(lead.id)}>{formatDateToLocal(lead.createdAt)}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.firstName} {lead.lastName}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.message}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.email}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.country}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.phone}</td>
                                        <td onClick={() => handleNaviate(lead.id)}>{lead.lead_user === null ? 'sin asignar' : lead.lead_user?.firstName + " " + lead.lead_user?.lastName}</td>
                                        <th><LeadsSubMenu leadId={lead.id} users={userState.users} /></th>
                                    </tr>
                                ))}
                            </tbody>
                            <tbody className='md:hidden'>
                                {leadsState.leads.map(lead => (
                                    <tr key={lead.id} className='hover cursor-pointer'>
                                        <td className='flex justify-between items-center border-b-[1px] border-b-gray-300'>
                                            <div onClick={() => handleNaviate(lead.id)}>
                                                <p className='font-semibold'>{lead.firstName} {lead.lastName}</p>
                                                <p className='flex gap-2 items-center'><FaCalendar /> {formatDateToLocal(lead.createdAt)}</p>
                                                <p className='flex gap-2 items-center'><FaMailBulk />{lead.email}</p>
                                                <p className='flex gap-2 items-center'> <FaPhone />{lead.phone}</p>
                                                <p className='flex gap-2 items-center'> <FaUser />{lead.lead_user === null ? 'sin asignar' : lead.lead_user?.firstName + " " + lead.lead_user?.lastName}</p>
                                            </div>
                                            <div>
                                                <LeadsSubMenu leadId={lead.id} users={userState.users} />
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

export default LeadsList;