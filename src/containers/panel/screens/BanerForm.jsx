import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import HomeLayout from '../../../layouts/HomeLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import BtnContent from '../../../components/buttons/BtnContent';

// SLICES 
import { createBanerThunk, getBanerByIdThunk, updateBanerThunk } from '../../../store/slices/pages/baner.slice';

// RESOURCES
import Error from '../../../components/errors/Error';
import { API_BASE_URL } from '../../../store/constans';
import { Toast } from '../../../resources/utils';
import EditorForm from '../../../components/Inputs/formInput/EditorForm';

const BanerForm = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { baner_id, page } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [textOne, setTextOne] = useState('');
    const [textTwo, setTextTwo] = useState('');
    const banerState = useSelector(state => state.baner);
    const isLoading = useSelector(state => state.isLoadingSlice);

    const { setValue, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (baner_id) {
            dispatch(getBanerByIdThunk(baner_id));
        }
    }, []);

    useEffect(() => {
        setTitle(banerState.baner?.title);
        setTextOne(banerState.baner?.text);
        setTextTwo(banerState.baner?.textTwo);
    }, [banerState.baner]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', textOne);
        formData.append('textTwo', textTwo);
        formData.append('page', banerState.baner?.page);
        formData.append('type', 'baner');
        if(data.image[0]){
            formData.append('image',  data.image[0]);
        } else {
            formData.append('image',  banerState.baner?.image);
        }

        if (baner_id) {
            dispatch(updateBanerThunk(baner_id, formData));
        } else {
            formData
            dispatch(createBanerThunk(formData));
        }
    };

    if (banerState.message === "resource created successfully" || banerState.message === "resource updated successfully") {
        Toast.fire({
            icon: 'success',
            title: banerState.message
        })
        dispatch(getBanerByIdThunk(baner_id));
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
   
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const handleChangeTitle = (content) => {
        setTitle(content);
    };

    const handleChangeText = (content) => {
        setTextOne(content);
    };

    const handleChangeTextTwo = (content) => {
        setTextTwo(content);
    };

    return (
        <HomeLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    {banerState.error ? <Error state={banerState.error} /> : " "}
                    <HeaderForm title={"Formulario"} />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex p-2'>
                                <EditorForm
                                    id={"title_baner"}
                                    label={"Title"}
                                    spam={true}
                                    cols={1}
                                    onChange={handleChangeTitle}
                                    initialValue={title}
                                />
                            </div>
                            <div className='flex p-2'>
                                <EditorForm
                                    id={"text_one"}
                                    label={"text one"}
                                    spam={true}
                                    cols={1}
                                    onChange={handleChangeText}
                                    initialValue={textOne}
                                />
                            </div>
                            <div className='flex p-2'>
                                <EditorForm
                                    id={"text_two"}
                                    label={"text two"}
                                    spam={true}
                                    cols={1}
                                    onChange={handleChangeTextTwo}
                                    initialValue={textTwo}
                                />
                            </div>
                            <div className='flex gap-2 p-2 items-center font-semibold'>
                                <label className="text-sm flex m-1">Imágen<span className="text-red-500">*</span></label>
                                <div className='flex flex-col gap-2'>
                                    {selectedImage || banerState.baner?.image ?
                                        <img className='h-32 w-42' src={selectedImage ? selectedImage : `${API_BASE_URL}${banerState.baner?.image}`} alt="" /> : ""}
                                    <input {...register('image')} type="file" onChange={handleImageChange} accept="image/*" className='bg-slate-200 file-input file-input-bordered file-input-info file-input-xs w-full max-w-xs' />
                                </div>
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">{t("save_button")}</BtnContent>
                                <BtnContent cancel={true} to={`/panel/${page}`}>{t("canceled_button")}</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default BanerForm;