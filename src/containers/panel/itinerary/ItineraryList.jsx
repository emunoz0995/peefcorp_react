import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from 'react-router-dom';
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import Error from '../../../components/errors/Error';
//SLICE
import { deleteItineraryThunk, getItinerarysForPageThunk } from '../../../store/slices/catalogs/itinerary.slice';
//RESOURCE
import { API_BASE_URL } from '../../../store/constans';

const ItineraryList = () => {

    const { t } = useTranslation();
    const { page, type } = useParams();
    const itineraryState = useSelector(state => state.itineraries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItinerarysForPageThunk(page));
    }, [type]);

    if (itineraryState.message === "resource deleted successfully") {
        dispatch(getItinerarysForPageThunk(page));
    }

    const handleDelete = (yacht_id) => {
        dispatch(deleteItineraryThunk(yacht_id));
    };

    return (
        <HomeLayout>
            {itineraryState.fetching || itineraryState.processing ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full'>
                    {itineraryState.error ? <Error state={itineraryState.error} /> : " "}
                    <HeaderSimple title={t("Servicios")} to={`/panel/${page}/nuevo_servicio`} />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm w-full text-start">
                            <thead className='bg-sky-600/20 border-t-2 border-t-[#2c6a80]' >
                                <tr className='text-left h-[50px] bg-[#c2c2c2]/20'>
                                    <th className='w-[200px]'>{t("Image")}</th>
                                    <th className='w-[200px]'>{t("Titulo")}</th>
                                    <th className='w-[200px]'>{t("Descripción")}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itineraryState.itineraries.map(itinerary => (
                                    <tr key={itinerary.id} className='border-b-[2px] border-white duration-75'>
                                        <td>
                                            <img className='rounded-md w-18 h-14' src={`${API_BASE_URL}${itinerary.image}`} alt={itinerary.name} />
                                        </td>
                                        <td >
                                            <div className='text-start flex flex-col items-start'>
                                                <h1 className='uppercase font-semibold'>{itinerary.name}</h1>
                                            </div>
                                        </td>
                                        <td >
                                            <div className='text-start flex flex-col items-start'>
                                                <p>{itinerary.description}</p>
                                            </div>
                                        </td>
                                        <td >
                                            <div className='flex gap-1 justify-end'>
                                                <BtnTable action="edit" to={`/panel/${page}/${itinerary.id}`} />
                                                <BtnTable title={t("itinerary_delete")} action="delete" onclick={() => handleDelete(itinerary.id)} />
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

export default ItineraryList;