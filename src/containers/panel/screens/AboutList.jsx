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
//SLICE
import { getAboutScreenAdminThunk, initialStatePage } from '../../../store/slices/pages/page.slice';
//RESOURCES
import { API_BASE_URL } from '../../../store/constans';

const AboutList = () => {

    const { t } = useTranslation();
    const aboutState = useSelector(state => state.page);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAboutScreenAdminThunk());
        return (() => (
            dispatch(initialStatePage())
        ))
    }, []);

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full'>
                    {aboutState.error ? <Error state={aboutState.error} /> : " "}
                    <HeaderSimpleII title={t("Pagina - Sobre nosotros")} />
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
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutState.page.baner?.title) }}></p>
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutState.page.baner?.text) }}></p>
                                        <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutState.page.baner?.textTwo) }}></p>
                                    </td>
                                    <td >
                                        <p className='font-semibold'>{aboutState.page.baner?.type}</p>
                                    </td>
                                    <td >
                                        <div className='flex justify-center items-start'>
                                            <img className='rounded-full w-16 h-14' src={`${API_BASE_URL}${aboutState.page.baner?.image}`} alt={aboutState.page.baner?.name} />
                                        </div>
                                    </td>
                                    <td >
                                        <div className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/panel/${aboutState.page.baner?.page}/baner/${aboutState.page.baner?.id}`} />
                                        </div>
                                    </td>
                                </tr>
                                {aboutState.page.sections?.map(item => (
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
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default AboutList;