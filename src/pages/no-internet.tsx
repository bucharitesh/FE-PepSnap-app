/* eslint-disable react/no-unescaped-entities */
import Internet from '@/components/icons/internet';
import React from 'react';

const Error = () => {
  return (
    <div className="z-50 flex h-screen items-center justify-center bg-white px-8 text-center">
      <div className="relative mb-4 flex h-64 w-full items-center justify-center">
        <Internet />
      </div>
      <div className="absolute bottom-24 left-0 w-full px-8">
        <h3 className="text-2xl font-bold text-primary">No Internet</h3>
        <p className="mt-2 font-light text-primary">Please check your connection</p>
      </div>
    </div>
  );
};

export default Error;
