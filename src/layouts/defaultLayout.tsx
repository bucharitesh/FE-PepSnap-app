import { domAnimation, LazyMotion, m } from 'framer-motion';

const Layout = ({ children }: any) => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="h-screen w-screen bg-white"
    >
      {children}
    </m.div>
  </LazyMotion>
);
export default Layout;
