import { domAnimation, LazyMotion, m } from 'framer-motion';
import React from 'react';

const Button = ({ children, textColor = 'text-white', bgColor = 'bg-primary', onClick }: any) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={onClick}
        className={`w-full rounded-lg ${textColor} ${bgColor} py-3 font-bold uppercase`}
      >
        {children}
      </m.button>
    </LazyMotion>
  );
};

export default Button;
