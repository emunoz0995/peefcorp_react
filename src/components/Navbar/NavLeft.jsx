import React from 'react';
import { useToolbarStore } from '../../store/VitalStore';
//UI
import logo from '../../assets/teck_logo.png';
import AdminList from './AdminList';
import PanelList from './PanelList';

const NavLeft = () => {

  const { isToolbarOpen,  } = useToolbarStore((state) => state);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div
      className={`text-white bg-cover bg-center bg-[url('../src/assets/it_services.jpg')] font-sans shadow-lg fixed z-10 top-0 bottom-0 shadow-black/30 md:translate-x-0 transition-all w-60  ${isToolbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#8e8a8a9f] "></div>
      <div className="flex items-center justify-center gap-2 my-5 h-20 z-20 relative">
        <img className="object-contain h-[80px] md:h-[90px] 2xl:h-[100px] " src={logo} alt="logo" />
      </div>
      <ul className="flex flex-col h-full items-start justify-start w-full gap-2 px-3 z-20 relative ">
        {user.role === 'admin' ?
          <AdminList /> : ""
        }
        <PanelList />
      </ul>
    </div>
  );
};

export default NavLeft;
