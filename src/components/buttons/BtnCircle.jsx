import React from 'react';

const BtnCircle = ({ children, btnAction }) => {
  return (
    <button
      onClick={btnAction}
      className=" flex h-full w-full items-center justify-end gap-3"
    >
      {children}
    </button>
  );
};

export default BtnCircle;
