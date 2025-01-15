import React, { useEffect, useState } from 'react';
import { setLeadMessages, setLeadError } from '../../store/slices/pages/proceduresLeads.slice';
import { useDispatch } from 'react-redux';
import { logOut } from '../../resources/utils';
import axios from 'axios';


const LeadsSubMenu = ({ leadId, users }) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const dispatch = useDispatch();
    const handleIconoClick = () => {
        setPopupVisible(!popupVisible);
    };

    const assingLead = (userId) => {
        const data = {
            userId
        }
        axios.put(`/leads/assingLeadtoUser/${leadId}`, data)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLeadMessages(res.data.data))
            }
        })
        .catch(res => {
            if (res.response.status === 498) {
                logOut();
            } else {
                dispatch(setLeadError(res.response?.data))
            }
        })
    };

    return (
        <button
            className="bg-green-200  hover:bg-green-400 relative cursor-pointer transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
            onClick={handleIconoClick}
        >
            <label className="swap swap-rotate">
                <svg
                    className={`${popupVisible ? 'swap-off hidden' : ''} fill-current`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                <svg
                    className={`${!popupVisible ? 'swap-on' : ''} fill-current`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512">
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

            </label>
            {popupVisible && (
                <div className="absolute top-10 left-[-180px] z-10 text-gray-700 w-[100px] ">
                    <ul className="menu bg-white w-52 shadow-sm shadow-gray-600">
                        {
                            users.map(user => (
                                <li key={user.id} onClick={() => assingLead(user.id)} className='hover:bg-gray-300 flex items-center justify-center'>
                                    <p>{user?.first_name + " " + user?.last_name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </button>
    );
};

export default LeadsSubMenu;