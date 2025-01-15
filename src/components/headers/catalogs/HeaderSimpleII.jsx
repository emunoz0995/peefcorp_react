import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';


const HeaderSimpleII = ({title, to}) => {
    return (
        <div className='hidden w-ful md:flex text-2xl font-semibold justify-start gap-2 mb-5'>
            <h1>{title}</h1>
        </div>
    );
};

export default HeaderSimpleII;