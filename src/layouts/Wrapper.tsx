/* eslint-disable import/order */
import React from 'react';
import Header from '@/components/shared/Header';
import Image from 'next/image';

interface WrapperProps {
  children: React.ReactNode;
  image?: string;
  title?: string;
  padding?: boolean
}

const Wrapper = ({
  children,
  title = 'Test Title',
  image = '/assets/images/support.svg',
  padding = true
}: WrapperProps) => {
  return (
    <div className="relative h-screen w-screen bg-white pt-64 text-black">
      <div className="gradient absolute top-0 z-0 h-40 w-full px-6">
        {/* Header */}
        <Header inverse />
        <div className="mt-8 flex items-center justify-between">
          <p className="text-2xl font-bold">{title}</p>
          <div className="relative h-28 w-28">
            <Image src={image} layout="fill" alt={title} />
          </div>
        </div>
      </div>
      <div className={`relative ${padding && 'px-6'} text-black`}>{children}</div>
    </div>
  );
};

export default Wrapper;
