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
import { getHomeScreenAdminThunk, initialStatePage } from '../../../store/slices/pages/page.slice';
//RESOURCES
import { API_BASE_URL } from '../../../store/constans';

const HomeList = () => {

    const { t } = useTranslation();
    const homeState = useSelector(state => state.page);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeScreenAdminThunk());
        return (() => (
            dispatch(initialStatePage())
        ))
    }, []);
    
    console.log(homeState)
    console.log(isLoading)

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className='mx-5 my-5 w-full'>
                    {homeState.error ? <Error state={homeState.error} /> : " "}
                    <HeaderSimpleII title={t("Pagina - inicio")} />
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
                                {homeState.pages?.map(item => (
                                    <tr className='border-b-[2px] duration-75 h-[100px] border-white'>
                                        <td >
                                            <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.title) }}></p>
                                            <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.text) }}></p>
                                            <p className=' font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.textTwo) }}></p>
                                        </td>
                                        <td >
                                            <p className='font-semibold'>{item?.type}</p>
                                        </td>
                                        <td >
                                            <div className='flex justify-center items-start'>
                                                <img className='rounded-full w-16 h-14' src={`${API_BASE_URL}${item.image}`} alt={item?.name} />
                                            </div>
                                        </td>
                                        <td >
                                            <div className='flex gap-1 justify-end'>
                                                <BtnTable action="edit" to={`/panel/inicio/${item?.type}/${item?.id}`} />
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

export default HomeList;