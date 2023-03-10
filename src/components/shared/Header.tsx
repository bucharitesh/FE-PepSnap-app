import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useVuplex } from '@/lib/hooks';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';
import { useEffect, useState } from 'react';

interface HeaderProps {
  inverse?: boolean;
}

const Header = ({ inverse = false }: HeaderProps) => {
  const router = useRouter();
  const { sendDataToVuplex } = useVuplex();

  const [clientConfig, setClientConfig] = useState<any>(null);

  useEffect(() => {
    const clientRes = JSON.parse(localStorage.getItem('clientConfig') as string);
    setClientConfig(clientRes);
  }, []);

  return (
    <div className={`relative mt-8 flex items-center`}>
      <div className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        {inverse ? (
          <IoIosArrowBack
            className={`text-3xl ${inverse ? 'text-black' : 'text-white'}`}
            onClick={() => {
              router.push('/home');
            }}
          />
        ) : (
          <RxCross2
            className={`text-3xl ${inverse ? 'text-black' : 'text-white'}`}
            onClick={() => {
              sendDataToVuplex(VUPLEX_EVENTS.CLOSE_MENU, 'hellooo close hojayega');
            }}
          />
        )}
      </div>
      <div className="z-0 mx-auto h-10 w-36">
        {clientConfig && (
          <Image
            src={inverse ? clientConfig?.inverseLogoUrl : clientConfig?.logoUrl}
            className="object-contain"
            layout="fill"
            alt="sda"
            priority
          />
        )}
      </div>
    </div>
  );
};

export default Header;
