import React from 'react';
import { Oval } from 'react-loader-spinner';
import HomeLayout from '../../layouts/HomeLayout';

export default function MainLoader() {
  return (
      <div className="m-auto h-screen flex flex-col items-center justify-center">
        <span className="loading loading-ring loading-lg text-sky-500"></span>
        <p>Loading ...</p>
      </div>
  );
}
