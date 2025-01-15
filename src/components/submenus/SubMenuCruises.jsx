import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenuCruises = ({ showMenu, yachtState, onMouseEnter, onMouseLeave }) => {

    const [show, setShow] = useState(false);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${showMenu ? 'duration-700 flex fixed top-[15%] left-[25.7%] flex-col  2xl:top-[12.4%] 2xl:left-[28.5%] ' : 'hidden'} `}>
            <div className={`flex items-center  history`}>
                <div className="bg-[#000000bb] p-2 shadow-md w-[173px] ">
                    <ul tabIndex={0} className="dropdown-content justify-center menu p-1 shadow-lg uppercase">
                        {
                            yachtState?.map(yacht => (
                                <li key={yacht.id} className='hover:text-orange-400'>
                                    <Link to={`/galapagos-cruises/${yacht.code}`}>
                                        <span>{yacht.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubMenuCruises;