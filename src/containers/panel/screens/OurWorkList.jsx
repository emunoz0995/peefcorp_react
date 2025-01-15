import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import DOMPurify from 'dompurify';

//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import MainLoader from '../../../components/Loaders/MainLoader';
import Error from '../../../components/errors/Error';
import HeaderSimpleII from '../../../components/headers/catalogs/HeaderSimpleII';
import OurHistoryPanelSlider from '../../../components/sliders/OurHistoryPanelSlider';

//SLICE
import { getOurWorkScreenAdminThunk } from '../../../store/slices/pages/page.slice';
import { getItinerarysForPageThunk } from '../../../store/slices/catalogs/itinerary.slice';

//RESOURCES
import { API_BASE_URL } from '../../../store/constans';

const OurWorkList = () => {

    const { t } = useTranslation();
    const ourWorkState = useSelector(state => state.page);
    const itineraryState = useSelector(state => state.itineraries);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOurWorkScreenAdminThunk());
        dispatch(getItinerarysForPageThunk('nuestro_trabajo'));
    }, []);

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full'>
                    {ourWorkState.error ? <Error state={ourWorkState.error} /> : " "}
                    <HeaderSimpleII title={t("Pagina - Nuestro trabajo")} />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm w-full text-start">
                            <thead >
                                <tr className='text-left h-[50px] bg-sky-600/20 border-t-2 border-t-[#2c6a80]'>
                                    <th className='w-[800px]'>{t("Title")}</th>
                                    <th>{t("Type")}</th>
                                    <th className='text-center'>{t("Image")}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr className='border-b-[2px] duration-75 h-[100px] border-white'>
                                    <td >
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ourWorkState.page.baner?.title) }}></p>
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ourWorkState.page.baner?.text) }}></p>
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ourWorkState.page.baner?.textTwo) }}></p>
                                    </td>
                                    <td >
                                        <p className='font-semibold'>{ourWorkState.page.baner?.type}</p>
                                    </td>
                                    <td >
                                        <div className='flex justify-center items-start'>
                                            <img className='rounded-full w-16 h-14' src={`${API_BASE_URL}${ourWorkState.page.baner?.image}`} alt={ourWorkState.page.baner?.name} />
                                        </div>
                                    </td>
                                    <td >
                                        <div className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/panel/${ourWorkState.page.baner?.page}/baner/${ourWorkState.page.baner?.id}`} />
                                        </div>
                                    </td>
                                </tr>
                                {ourWorkState.page.sections?.map(item => (
                                    <tr className='border-b-[2px] duration-75 h-[100px] border-white'>
                                        <td >
                                            <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.title) }}></p>
                                            <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.text) }}></p>
                                        </td>
                                        <td >
                                            <p className='font-semibold'>{item?.page}</p>
                                        </td>
                                        <td >
                                            <div className='flex justify-center items-start'>
                                                <img className='rounded-full w-16 h-14' src={`${API_BASE_URL}${item.image}`} alt={item?.name} />
                                            </div>
                                        </td>
                                        <td >
                                            <div className='flex gap-1 justify-end'>
                                                <BtnTable action="edit" to={`/panel/${item?.page}/section/${item?.id}`} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                 <tr className='border-b-[2px] duration-75 h-[100px] border-white'>
                                    <td >
                                        <ul className='text-start my-5 text-[15px] list-disc px-10 '>
                                            {
                                                itineraryState.itineraries.map(service => (
                                                    <li key={service.id}>
                                                        {service.name}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td >
                                        <p className='font-semibold'>proyectos</p>
                                    </td>
                                    <td >
                                        <div className='flex justify-center items-start'>
                                            <OurHistoryPanelSlider images={itineraryState.itineraries} />
                                        </div>
                                    </td>
                                    <td >
                                        <div className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/panel/${ourWorkState.page.baner?.page}/lista_servicios`} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default OurWorkList;