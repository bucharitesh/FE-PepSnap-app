/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable func-names */
import { useRouter } from 'next/router';

declare global {
  interface Window {
    vuplex: any;
  }
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
const useVuplex = () => {
  const router = useRouter();

  function sendDataToVuplex(type: string, message: string) {
    function sendMessageToApp(type: string, message: string) {
      window?.vuplex?.postMessage({ type, message });
    }
    if (window?.vuplex) {
      sendMessageToApp(type, message);
    } else {
      window?.addEventListener('vuplexready', () => {
        sendMessageToApp(type, message);
      });
    }
  }

  function handleGet() {
    function addMessageListener() {
      window?.vuplex?.addEventListener('message', function (event: any) {
        const json = event?.data;
        const res = JSON.parse(json);
        if (res?.type === 'VUPLEX_INIT') {
          localStorage.setItem('deviceData', JSON.stringify(res?.message));
        }
        if (res?.type === 'VUPLEX_CLOSE') {
          router?.replace('/');
        }
        if (res?.type === 'CARD_UPDATE') {
          localStorage.setItem('ref_id', JSON.stringify(res?.message));
          router?.replace('/modal/creation');
        }
      });
    }

    if (window.vuplex) {
      addMessageListener();
    } else {
      window?.addEventListener('vuplexready', addMessageListener);
    }
  }

  function handleRoute() {
    function addMessageListener() {
      window?.vuplex?.addEventListener('message', function (event: any) {
        const json = event?.data;
        const res = JSON?.parse(json);
        if (res?.type === 'PAGE_CHANGE') {
          router.push(`${res.message}`);
        }
      });
    }

    if (window.vuplex) {
      addMessageListener();
    } else {
      window?.addEventListener('vuplexready', addMessageListener);
    }
  }

  return { sendDataToVuplex, handleRoute, handleGet };
};

export default useVuplex;
