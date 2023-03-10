import { useEffect, useState } from 'react';

export default function useInternetConnection() {
  const [isOffline, setIsOffline] = useState(false);


  function addMessageListener() {
    window?.vuplex?.addEventListener('message', function (event: any) {
      const json = event?.data;
      const res = JSON?.parse(json);
      if (res?.type === 'INTERNET_ACTIVE') {
        setIsOffline(false)
      }
      if (res?.type === 'INTERNET_DISABLED') {
        setIsOffline(true);
      }
    });
  }

  useEffect(() => {
    const onOnline = () => {
      setIsOffline(false);
    };
    const onOffline = () => {
      setIsOffline(true);
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    if (window.vuplex) {
      addMessageListener();
    } else {
      window?.addEventListener('vuplexready', addMessageListener);
    }

    window.onerror = () => {
      return false;
    };
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return isOffline;
}
