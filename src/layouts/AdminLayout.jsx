import React from 'react';
import Overlay from '../components/overlay/Overlay';
import NavTopAdmin from '../components/Navbar/NavTopAdmin';
import NavLeftAdmin from '../components/Navbar/NavLeftAdmin';

const AdminLayout = ({ children }) => {

  return (
    <>
      <div className="h-screen overflow-auto contenedor">
        <NavTopAdmin />
        <Overlay />
        <NavLeftAdmin />
        <div className="h-full flex md:ml-[60px] pt-14 bg-gray-100 font">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
