import React from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
//UI
import { FaUsers } from 'react-icons/fa';
import BtnDashboard from '../buttons/BtnDashboard';
//RESOURCERS
import { useCollapsed, useToolbarStore } from '../../store/VitalStore';

const AdminList = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { closeToolbar } = useToolbarStore((state) => state);

    return (
        <div className='w-[100%]'>
            <div className='pl-2 text-[10px] font-semibold text-start'>{t("Admistración")}</div>
            <li
                onClick={(e) => { navigate('/panel/users'); closeToolbar(); }}
                className={`w-full ${location.pathname === '/panel/users' ? 'active' :
                    location.pathname === '/panel/users/users_new' ? 'active' : ''}`}>
                <BtnDashboard>
                    <FaUsers />
                    <p>{t("Usuarios")}</p>
                </BtnDashboard>
            </li>

        </div>
    );
};

export default AdminList;