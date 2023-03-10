import Header from '@/components/shared/Header';
import Layout from '@/layouts/defaultLayout';
import { useVuplex } from '@/lib/hooks';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {AiOutlineInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineTwitter, AiOutlineWhatsApp} from 'react-icons/ai'
import {FaDiscord} from 'react-icons/fa'
import {FiGlobe} from 'react-icons/fi'

const Home = () => {
  const router = useRouter();
  const { sendDataToVuplex } = useVuplex();

  const [clientConfig, setClientConfig] = useState<any>(null);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('clientConfig') as string);
    setClientConfig(config);
  }, []);

  let yoyoData: any;

  if (typeof window !== 'undefined') {
    yoyoData = localStorage.getItem('deviceData') as string;
  }

  const localStrorageData = yoyoData && JSON.parse(yoyoData);

  // const bg = `bg-[${clientConfig?.primary}]`;

  const icons: any = {
    instagram: <AiOutlineInstagram />,
    linkedIn: <AiFillLinkedin />,
    youTube: <AiFillYoutube />,
    discord: <FaDiscord />,
    twitter: <AiOutlineTwitter />,
    web: <FiGlobe />,
    whatsApp: <AiOutlineWhatsApp />
  }

  return (
    <Layout>
      <div className="h-screen w-screen">
        <div className="z-0 h-screen w-screen"></div>
          <div
            className={`absolute top-0 left-0 z-10 h-screen w-screen bg-primary px-6 pb-8`}
          >
            {/* Header */}
            <Header />

            {/* Menu Items */}
            <div className="mt-12 grid grid-cols-1 gap-4">
              {clientConfig &&
                clientConfig?.routes?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="relative mt-3 rounded-lg text-xl font-bold capitalize text-white"
                      onClick={() => {
                        if (item.type === 'route') {
                          router.replace(item.action);
                        }

                        if (item.type === 'url') {
                          sendDataToVuplex(VUPLEX_EVENTS.RATE_US, item.action);
                        }
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {clientConfig &&
                clientConfig?.socials?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => sendDataToVuplex(VUPLEX_EVENTS.RATE_US, item.action)}
                      className="mt-8 text-4xl text-white"
                    >
                      {icons[item.name]}
                    </div>
                  );
                })}
            </div>

            {localStrorageData && localStrorageData?.appVersion && (
              <div className="absolute bottom-10 gap-3 text-white opacity-60">
                App Version {localStrorageData?.appVersion}
              </div>
            )}
          </div>
      </div>
    </Layout>
  );
};

export default Home;
