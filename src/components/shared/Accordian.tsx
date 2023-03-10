import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

interface HeaderProps {
  id?: number;
  title?: string;
  description?: React.ReactNode;
  expanded: any;
  setExpanded: any;
}

const Accordion = ({
  id,
  title = 'Test',
  description = 'hellu',
  expanded,
  setExpanded,
}: HeaderProps) => {
  const isOpen = id === expanded;

  return (
    <AnimatePresence>
      <LazyMotion features={domAnimation}>
        <m.div
          onClick={() => setExpanded(isOpen ? false : id)}
          className={`flex items-center justify-between px-6 text-lg text-primary`}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { marginBottom: '1rem' },
            collapsed: { marginBottom: '2rem' },
          }}
          transition={{ type: 'spring' }}
        >
          <span>{title}</span>
          <BsChevronDown
            className={`text-xl transition-all duration-[400] ${!isOpen && '-rotate-90'}`}
          />
        </m.div>
        {isOpen ? (
          <m.div
            key={id}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', margin: '1rem 0' },
              collapsed: { opacity: 0, height: 0, margin: 0 },
            }}
            transition={{ type: 'spring', duration: 0.75, damping: 20 }}
            className="bg-[#F9FAFB]"
          >
            <p className="p-6">{description}</p>
          </m.div>
        ) : null}
      </LazyMotion>
    </AnimatePresence>
  );
};

export default Accordion;
