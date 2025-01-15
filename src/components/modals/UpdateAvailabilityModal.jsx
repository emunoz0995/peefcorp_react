import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//UI
import InputForm from '../Inputs/formInput/InputForm';
import HeaderForm from '../headers/catalogs/HeaderForm';

// SLICE
import { updateAvailabilityThunk, initialStateAvailability } from '../../store/slices/availability/proceduresAvailability.slice'
//RESOURCE 
import BtnContent from '../buttons/BtnContent';
import BtnTable from '../buttons/BtnTable';

const UpdateAvailabilityModal = ({year}) => {

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)
    const availabilityState = useSelector(state => state.proceduresAvailability)
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        return () => {
            dispatch(initialStateAvailability())
        }
    }, [])

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);
        dispatch(updateAvailabilityThunk(year, formData));
    };

    const handleOpenModal = (action) => {
        setOpenModal(action)
        if (action === false) {
            reset();
            dispatch(initialStateAvailability())
        }
    }

    if (availabilityState.message === 'resource updated successfully') {
        reset();
    }

    return (
        <>
            <BtnTable action="edit_modal" funtion={() => handleOpenModal(true)} />
            <dialog id="my_modal_3" className={`bg-gray-600/40 backdrop-blur-sm fixed top-0 w-full h-screen justify-center ${openModal ? "flex" : "hidden"} `}>
                <div className="modal-box p-5 max-w-xl max-h-[320px] contenedor mt-[120px] bg-white rounded-md">
                    <button onClick={() => handleOpenModal(false)} className="z-20 border-none text-gray-700 btn btn-sm btn-circle bg-rose-200  hover:bg-rose-400 absolute right-2 top-2">✕</button>
                    {
                        availabilityState.error ?
                            <div className='flex flex-col p-2 w-full text-gray-800 border-red-500 rounded-md border mt-6 bg-red-200'>
                                <p className='mb-0'>{availabilityState.error}</p>
                            </div>
                            : ' '
                    }

                    <form onSubmit={handleSubmit(onSubmit)} className='text-gray-700'>
                        <HeaderForm title={"Update Availability"} />
                        <div className='flex gap-2 p-2'>
                            <InputForm
                                spam={true}
                                label={"Excel file"}
                                input="file-input"
                                type="file"
                                cols={1}
                                register={register("file", { required: true })}
                                errors={errors.file && (<span className="text-red-500 text-xs">{"required information"}</span>)}
                            />
                        </div>
                        {
                            availabilityState.processing ?
                                <div className='flex flex-col items-center justify-center'>
                                    <span className="loading loading-ring loading-lg"></span>
                                    <h1>Creating</h1>
                                </div> :
                                <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                    <BtnContent type="submit">{"Save"}</BtnContent>
                                    <BtnContent type="initDay" funtion={() => handleOpenModal(false)}>{"Cancel"}</BtnContent>
                                </div>
                        }
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default UpdateAvailabilityModal;