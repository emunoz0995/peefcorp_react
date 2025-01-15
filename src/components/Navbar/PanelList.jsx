import React from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//UI
import { FaAngleDoubleUp, FaHome } from 'react-icons/fa';
import BtnDashboard from '../buttons/BtnDashboard';
//RESOURCERS
import { useToolbarStore } from '../../store/VitalStore';
import { FaEarthAmericas, FaNetworkWired, FaPeopleArrows } from 'react-icons/fa6';

const PanelList = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { closeToolbar } = useToolbarStore((state) => state);
    const { service_id, baner_id, section_id, lead_id } = useParams();

    const user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className='w-[100%]'>
            <div className='pl-2 text-[10px] font-semibold text-start'>Paginas</div>
            {
                user.role === 'admin' || user.role === 'marketing' ?
                    <>
                        <li
                            onClick={(e) => { navigate('/panel/inicio'); closeToolbar(); }}
                            className={`w-full ${location.pathname === '/panel/inicio' ? 'active' :
                                location.pathname === `/panel/inicio/baner/${baner_id}` ? 'active' : ''}`}>
                            <BtnDashboard>
                                <FaHome />
                                <p>{t("Inicio")}</p>
                            </BtnDashboard>
                        </li>

                        <li
                            onClick={(e) => { navigate('/panel/sobre_nosotros'); closeToolbar(); }}
                            className={`w-full ${location.pathname === '/panel/sobre_nosotros' ? 'active' :
                                location.pathname === `/panel/sobre_nosotros/baner/${baner_id}` ? 'active' :
                                location.pathname === `/panel/sobre_nosotros/section/${section_id}` ? 'active' : ''}`}>
                            <BtnDashboard>
                                <FaAngleDoubleUp />
                                <p>{t("Sobre nosotros")}</p>
                            </BtnDashboard>
                        </li>
                        <li
                            onClick={(e) => { navigate('/panel/servicios'); closeToolbar(); }}
                            className={`w-full ${location.pathname === '/panel/servicios' ? 'active' :
                                location.pathname === `/panel/servicios/baner/${baner_id}` ? 'active' :
                                location.pathname === `/panel/servicios/lista_servicios` ? 'active' :
                                location.pathname === `/panel/servicios/nuevo_servicio` ? 'active' :
                                location.pathname === `/panel/servicios/${service_id}` ? 'active' : 
                                location.pathname === `/panel/servicios/section/${section_id}` ? 'active' :''}`}>
                            <BtnDashboard>
                                <FaNetworkWired />
                                <p>{t("Servicios")}</p>
                            </BtnDashboard>
                        </li>
                        <li
                            onClick={(e) => { navigate('/panel/nuestro_trabajo'); closeToolbar(); }}
                            className={`w-full ${location.pathname === '/panel/nuestro_trabajo' ? 'active' :
                                location.pathname === `/panel/nuestro_trabajo/baner/${baner_id}` ? 'active' : 
                                location.pathname === `/panel/nuestro_trabajo/lista_servicios` ? 'active' :
                                location.pathname === `/panel/nuestro_trabajo/nuevo_servicio` ? 'active' :
                                location.pathname === `/panel/nuestro_trabajo/${service_id}` ? 'active' : 
                                location.pathname === `/panel/nuestro_trabajo/section/${section_id}` ? 'active' :''}`}>
                            <BtnDashboard>
                                <FaEarthAmericas />
                                <p>{t("Nuestro trabajo")}</p>
                            </BtnDashboard>
                        </li>


                    </> : " "
            }
            {
                user.role === 'admin' || user.role === 'marketing' || user.role === 'sales' ?
                    <>
                        <li
                            onClick={(e) => { navigate('/panel/leads'); closeToolbar(); }}
                            className={`w-full ${location.pathname === '/panel/leads' ? 'active' :
                                location.pathname === `/panel/leads/${lead_id}` ? 'active' : ''}`}>
                            <BtnDashboard>
                                <FaPeopleArrows />
                                <p>{t("Leads")}</p>
                            </BtnDashboard>
                        </li>
                    </>
                    :
                    " "
            }
        </div>
    );
};

export default PanelList;