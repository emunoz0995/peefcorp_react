import React from 'react';
import NavLeft from '../components/Navbar/NavLeft';
import NavTop from '../components/Navbar/NavTop';
import Overlay from '../components/overlay/Overlay';

const HomeLayout = ({ children }) => {

  return (
    <>
      <div className="h-screen overflow-auto contenedor text-gray-700">
        <NavTop />
        <Overlay />
        <NavLeft />
        <div className="h-full flex md:ml-60 pt-14 bg-slate-200 font">{children}</div>
      </div>
    </>
  );
};

export default HomeLayout;
