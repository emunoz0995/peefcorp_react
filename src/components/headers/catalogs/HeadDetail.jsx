import React from 'react';
import { useTranslation } from "react-i18next";

const HeadDetail = ({cruiseState}) => {
    const { t } = useTranslation();
    return (
        <div className='flex p-2 mt-[-5px] mb-2 rounded-md bg-[#0c55a5] text-white justify-between text-[15px] shadow-base-300 shadow-lg'>
        <div className='flex gap-5 p-3'>
            <div className='gap-5 flex flex-col'>
                <h1>{t("head_detail_yacht") + ":"}</h1>
                <h1>{t("head_detail_itinerary") + ":"}</h1>
            </div>
            <div className='gap-5 flex flex-col'>
                <p> {cruiseState.yacht_name}</p>
                <p>{cruiseState.itinerary_name}</p>
            </div>
        </div>
        <div className='flex gap-5 p-3'>
            <div className='gap-5 flex flex-col'>
                <h1>{t("head_detail_startDate") + ":"}</h1>
                <h1>{t("head_detail_endDate") + ":"}</h1>
            </div>
            <div className='gap-5 flex flex-col'>
                <p>{cruiseState.start_date_format}</p>
                <p>{cruiseState.end_date_format}</p>
            </div>
        </div>
    </div>
    );
};

export default HeadDetail;