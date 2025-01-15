import React from 'react';
import { Link } from 'react-router-dom';


const BtnMotion = ({ children, type, to }) => {
    if (type === 'submit') {
        return (
            <button type={type} className='flex my-5 justify-center items-center gap-2 active:scale-95 transition-all hover:scale-110 hover:bg-green-500 bg-green-600 text-white p-2 rounded-sm font-bold shadow-lg shadow-base-content/30'>
                {children}
            </button>
        );
    } else {
        return (
            <Link to={to} >
                <button className='flex my-5 justify-center items-center gap-2 active:scale-95 transition-all hover:scale-110 hover:bg-green-500 bg-green-600 text-white p-2 rounded-sm font-bold shadow-lg shadow-base-content/30'>
                    {children}
                </button>
            </Link>
        );
    }

};

export default BtnMotion;