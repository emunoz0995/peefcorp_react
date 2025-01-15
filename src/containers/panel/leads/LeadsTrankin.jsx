import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import MainLoader from '../../../components/Loaders/MainLoader';
import InputDeckForm from '../../../components/Inputs/formInput/InputDeckForm';
import Error from '../../../components/errors/Error';
import HeaderSimpleII from '../../../components/headers/catalogs/HeaderSimpleII';
import { FaPlus, FaSave, FaTrashAlt } from 'react-icons/fa';
//SLICES
import { getLeadThunk, initialStateLead } from '../../../store/slices/pages/leads.slice';
import { formatDateToLocal } from '../../../utils/funtions';
import { createTrakin, initialStateProcedureLead } from '../../../store/slices/pages/proceduresLeads.slice';


const LeadsTrankin = () => {
    const { t } = useTranslation();
    let { lead_id } = useParams();
    const leadState = useSelector((state) => state.leads);
    const procedureState = useSelector((state) => state.proceduresLeads);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [site, setSite] = useState([]);
    const [error, setError] = useState(false);
    const user = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (lead_id) {
            dispatch(getLeadThunk(lead_id));
        }
        return () => {
            dispatch(initialStateLead());
            dispatch(initialStateProcedureLead());
        };
    }, []);

    const handleAddSite = () => {
        setSite([...site, { userId: user.id, leadId: lead_id, coments: '' }]);
    };

    const handleEliminar = (index) => {
        const nuevasPreguntas = [...site];
        nuevasPreguntas.splice(index, 1);
        setSite(nuevasPreguntas);
    };

    const handleChageTitle = (index, event) => {
        const nuevasPreguntas = [...site];
        nuevasPreguntas[index].coments = event.target.value;
        setSite(nuevasPreguntas);
    };

    const handleSave = () => {
        if (site[0].coments !== '') {
            dispatch(createTrakin(site[0]))
        } else {
            setError(true)
        }
    }

    useEffect(() => {
        if (procedureState.message === 'resource created successfully') {
            setSite([]); // Asegúrate de que esto establece un nuevo array vacío
            dispatch(initialStateProcedureLead());
            dispatch(getLeadThunk(lead_id));
        }
    }, [procedureState.message, dispatch, lead_id]);

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    {leadState.error ? <Error state={leadState.error} /> : " "}
                    <HeaderSimpleII title={'Lead - ' + leadState.lead.firstName + " " + leadState.lead.lastName} />
                    <div className='h-[90%] overflow-y-scroll contenedor border-[1px]'>
                        <div className="chat chat-start">
                            <div className="chat-header">
                                {leadState.lead.firstName + " " + leadState.lead.lastName}
                                <time className="text-xs opacity-50 ml-3">{formatDateToLocal(leadState.lead.createdAt)}</time>
                            </div>
                            <div className="chat-bubble bg-gray-300/50 text-gray-800 text-start">
                                <p>{leadState.lead.message}</p>
                                {
                                    leadState.lead.details ?
                                        <>
                                            <p className='font-semibold'>{leadState.lead?.yachtName}</p>
                                            <p>In: {leadState.lead.details?.in}</p>
                                            <p>Out: {leadState.lead.details?.out}</p>
                                            <p>Itineray: {leadState.lead.details?.itinerary}</p>
                                            <p>Spaces: {leadState.lead.details?.spaces}</p>
                                            <p>Cabins: {leadState.lead.details?.cabins}</p>
                                            <p>Conditions: {leadState.lead.details?.conditions}</p>
                                            <p>Main/Lower deck price: {leadState.lead.details?.isLastMinute ? ('$'+leadState.lead.details?.mainLowerLm) :  ('$'+leadState.lead.details?.mainLowerGross)}</p>
                                            <p>Upper deck price: {leadState.lead.details?.isLastMinute ? ('$'+leadState.lead.details?.upperLm) : ('$'+leadState.lead.details?.upperGross)}</p>
                                        </> 
                                    : " "
                                }



                            </div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                        {leadState.lead.trakin?.map(item => (
                            <div className="chat chat-end">
                                <div className="chat-header">
                                    {item.trankin_user.firstName + ' ' + item.trankin_user.lastName}
                                    <time className="text-xs opacity-50 ml-3">{formatDateToLocal(item.createdAt)}</time>
                                </div>
                                <div className="chat-bubble bg-green-300/50 text-gray-800">{item.coments}</div>
                            </div>
                        ))}
                        {site.map((pregunta, index) => (
                            <div className='w-full shadow-md shadow-gray-300 bg-gray-300/20 rounded-md py-2 border flex flex-col' key={index}>
                                <div className='flex gap-2 p-2'>
                                    <div className='flex flex-col w-full'>
                                        <InputDeckForm
                                            type="text"
                                            label={t("Comentario")}
                                            input="input"
                                            spam={true}
                                            cols={1}
                                            value={pregunta.title}
                                            onChange={(event) => handleChageTitle(index, event)}
                                        />
                                        {error && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                    </div>
                                </div>
                                <div className='p-2 justify-end w-full flex'>
                                    <button
                                        type="button"
                                        className='hover:bg-red-300/40 px-3 text-[14px] font-semibold transition-all gap-1 p-1 active:scale-95 rounded-full flex justify-center items-center  w-30 h-8'
                                        onClick={() => handleEliminar(index)}>
                                        <FaTrashAlt />Eliminar comentario
                                    </button>
                                </div>
                                <div className='p-2 justify-end w-full flex'>
                                    <button
                                        type="button"
                                        className='hover:bg-green-300/40 px-3 text-[14px] font-semibold transition-all gap-1 p-1 active:scale-95 rounded-full flex justify-center items-center  w-30 h-8'
                                        onClick={handleSave}>
                                        <FaSave />Guardar comentario
                                    </button>
                                </div>
                            </div>
                        ))}
                        {
                            site.length === 0 ?
                                <div className='p-2 justify-center w-full flex my-3'>
                                    <button
                                        type="button"
                                        className='hover:bg-green-300/40 text-[15px] font-semibold transition-all gap-1 p-1 px-2 active:scale-95 rounded-full flex justify-center items-center  w-30 h-8'
                                        onClick={handleAddSite}><FaPlus />Agregar comentario</button>
                                </div>
                                : " "
                        }
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default LeadsTrankin;