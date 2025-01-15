import React from 'react';
import { Link } from 'react-router-dom';

const BreadFourParts = ({titleOne, titleTwo, titleTree, titleFour, toOne, toTwo, toTree, span }) => {
    return (
        <div className={span === true ? "text-sm breadcrumbs border-b-[1px] border-orange-500 mb-3" : "text-sm breadcrumbs border-b-2 border-orange-500"}>
            <ul>
                <li className='text-sky-600'><Link to={toOne}>{titleOne}</Link></li>
                <li className='text-sky-600'><Link to={toTwo}>{titleTwo}</Link></li>
                <li className='text-sky-600'><Link to={toTree}>{titleTree}</Link></li>
                <li className='text-[17px] font-semibold text-gray-500'>{titleFour}</li>
            </ul>
        </div>
    );
};

export default BreadFourParts;