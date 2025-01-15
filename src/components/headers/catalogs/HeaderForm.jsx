import React from 'react';
import YachtSubMenu from '../../submenus/YachtSubMenu';



const HeaderSimple = ({ title, yacht_id }) => {
    return (
        <div className='w-ful flex text-2xl font-semibold justify-between items-center gap-2 mb-5 border-b-2 border-orange-500'>
            <h1 className='mb-2'>{title}</h1>
            {yacht_id ?
                <div>
                    <YachtSubMenu id={yacht_id} />
                </div>
                :
                " "
            }


        </div>
    );
};

export default HeaderSimple;