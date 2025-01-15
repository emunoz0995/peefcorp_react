import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import HomeLayout from '../../../layouts/HomeLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import BtnContent from '../../../components/buttons/BtnContent';
import { createItineraryThunk, getItineraryThunk, initialStateItinerary, updateItineraryThunk } from '../../../store/slices/catalogs/itinerary.slice';
// RESOURCES
import Error from '../../../components/errors/Error';
//RESOURCES
import { API_BASE_URL } from '../../../store/constans';

const ItineraryForm = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { service_id, page } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const itineraryState = useSelector((state) => state.itineraries);
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (service_id) {
            dispatch(getItineraryThunk(service_id));
        }
        return () => {
            dispatch(initialStateItinerary());
        };
    }, []);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        if (data.image[0]) {
            formData.append('image', data.image[0]);
        } else {
            formData.append('image', itineraryState.itinerary?.image);
        }

        if (service_id) {
            dispatch(updateItineraryThunk(service_id, formData));
        } else {
            dispatch(createItineraryThunk(formData));
        }
    };

    if (itineraryState.message === "resource created successfully" || itineraryState.message === "resource updated successfully") {
        navigate(`/panel/${page}/lista_servicios`);
    }

    if (Object.keys(itineraryState.itinerary).length !== 0) {
        setValue('name', itineraryState.itinerary?.name)
        setValue('description', itineraryState.itinerary?.description)
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

    return (
        <HomeLayout>
            {itineraryState.fetching || itineraryState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    {itineraryState.error ? <Error state={itineraryState.error} /> : " "}
                    <HeaderForm title={service_id ? "Editar servicio" : "Nuevo servicio"} />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label={t("yacht_name")}
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("name", { required: true })}
                                    errors={errors.name && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label={t("Descripción")}
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("description")}
                                />
                            </div>
                            <div className='flex flex-col gap-2 p-2 my-5 items-center font-semibold'>
                                <div className='flex items-center'>
                                    <label className="text-sm flex m-1">Imágen<span className="text-red-500">*</span></label>
                                    <input {...register('image')} type="file" onChange={handleImageChange} accept="image/*" className='bg-slate-200 file-input file-input-bordered file-input-info file-input-xs w-full max-w-xs' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {selectedImage || itineraryState.itinerary?.image ?
                                        <img className='h-32 w-42 rounded-md' src={selectedImage ? selectedImage : `${API_BASE_URL}${itineraryState.itinerary?.image}`} alt="" /> : ""}

                                </div>

                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">{t("save_button")}</BtnContent>
                                <BtnContent cancel={true} to={`/panel/${page}/lista_servicios`}>{t("canceled_button")}</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ItineraryForm;