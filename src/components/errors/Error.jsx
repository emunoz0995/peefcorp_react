import React from 'react';
import HomeLayout from '../../layouts/HomeLayout';

const Error = ({ state }) => {
    return (
        <div className='flex text-sm rounded-md shadow-sm shadow-gray-500/30 items-center mt-[-2px] mb-3 border border-red-300 h-10 w-full p-2 bg-red-200 text-red-800'>
            {state}
        </div>
    );
};

export default Error;