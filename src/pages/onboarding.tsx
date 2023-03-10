/* eslint-disable import/no-absolute-path */
import Button from '@/components/shared/Button';
import { useVuplex } from '@/lib/hooks';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import Swipe from 'react-easy-swipe';

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clientConfig, setClientConfig] = useState<any>(null);

  const { sendDataToVuplex } = useVuplex();

  const CarouselData = [
    {
      title: 'Ready. Steady. Extraordinary!',
      description: 'Point the Camera at your Image and place the whole Image in the defined frame',
      bg: 'bg-white',
      buttonBgColor: 'bg-primary',
      buttonTextColor: 'text-white',
      textColor: 'text-secondary',
      lottie: clientConfig?.lottieUrl[0],
      buttonText: 'Next',
    },
    {
      title: 'Light, Bright & Just Right!',
      description:
        'Make sure there’s sufficient light while scanning and avoid reflections or glare on the Image while scanning',
      bg: 'bg-white',
      textColor: 'text-secondary',
      buttonBgColor: 'bg-primary',
      buttonTextColor: 'text-white',
      lottie: clientConfig?.lottieUrl[1],
      buttonText: 'Next',
    },
    {
      title: 'Hocus Pocus Focus!',
      description:
        'Place your camera at an appropriate distance to get the right focus for scanning',
      bg: 'bg-white',
      buttonBgColor: 'bg-primary',
      buttonTextColor: 'text-white',
      textColor: 'text-secondary',
      lottie: clientConfig?.lottieUrl[2],
      buttonText: 'Get Started',
    },
  ];

  const LottieRenderer = ({ url }: any) => {
    return (
      <Lottie
        loop={true}
        // @ts-ignore
        path={url}
        autoplay={true}
        className="h-[100%]"
      />
    );
  };

  const { title, description, bg, buttonBgColor, lottie, buttonTextColor, textColor, buttonText } =
    CarouselData[activeIndex] as any;

  const handleNext = () => {
    if (activeIndex >= 2) {
      sendDataToVuplex(VUPLEX_EVENTS.ONBOARDING, 'Get started pressed');
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('clientConfig') as string);
    setClientConfig(a);
  }, []);

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    // @ts-ignore
    <Swipe
      onSwipeRight={() => handleBack()}
      onSwipeLeft={() => {
        if (activeIndex < 2) handleNext();
      }}
      style={{ overflowY: 'hidden' }}
      allowMouseEvents
    >
      <div
        className={`flex flex-col justify-between p-6 text-center ${textColor} h-screen w-screen ${bg} transition-all duration-500`}
      >
        {activeIndex !== 2 && (
          <span
            onClick={() => {
              sendDataToVuplex(VUPLEX_EVENTS.ONBOARDING, 'Get started pressed');
            }}
            className="absolute top-8 right-8 z-20 cursor-pointer text-lg font-bold uppercase text-primary transition-all"
          >
            Skip
          </span>
        )}
        <div className="h-[60%] w-full grow-0 translate-y-6">
          {lottie && <LottieRenderer url={lottie} />}
        </div>

        <div className="flex w-full -translate-y-6 items-center justify-center gap-1">
          {[0, 1, 2].map((index: number) => {
            return (
              <div
                key={index}
                className={`h-2 w-2 rounded-full bg-primary transition-all duration-300 ${
                  activeIndex === index ? 'w-6' : 'opacity-50'
                }`}
              ></div>
            );
          })}
        </div>
        <div className="z-20 mb-6">
          <p className="text-2xl font-bold text-textColor">{title}</p>
          <p className="mt-3 h-24 text-textColor">{description}</p>
        </div>

        <div className="relative">
          <Button onClick={handleNext} textColor={buttonTextColor} bgColor={buttonBgColor}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Swipe>
  );
};

export default Onboarding;
