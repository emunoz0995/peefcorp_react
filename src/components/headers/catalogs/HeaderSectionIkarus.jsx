import React from 'react';



const HeaderSectionIkarus = ({number, title}) => {
    return (
        <div className='w-ful flex text-sm font-semibold justify-start gap-2 mb-1 border-b-2 border-orange-600'>
            <h1 className='mb-2 text-gray-600'>{number}</h1>
            <h1 className='mb-2 text-gray-600'>{title}</h1>
        </div>
    );
};

export default HeaderSectionIkarus;