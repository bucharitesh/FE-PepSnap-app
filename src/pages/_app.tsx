/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable func-names */
import '../styles/global.css';

import ErrorBoundary from '@/components/ErrorBoundary';
import { useVuplex } from '@/lib/hooks';
import store from '@/lib/redux/store';
import Head from 'next/head';
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { AppProps } from 'next/app';
import NoInternet from './no-internet';

const persistor = persistStore(store);

const MyApp = ({ Component, pageProps, clientConfig }: AppProps & any) => {
  // const [,setLoading] = useState(false);

  const { handleRoute, handleGet } = useVuplex();

  // const isOffline = useInternetConnection();
  const isOffline = false;

  useEffect(() => {
    handleGet();
    handleRoute();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        localStorage.setItem('clientConfig', JSON.stringify(clientConfig));
        const r = document.querySelector(':root') as any;
        r.style.setProperty('--primary-color', clientConfig.primary);
        r.style.setProperty('--secondary-color', clientConfig.secondary);
        r.style.setProperty('--gradient-color', clientConfig.gradient);
        r.style.setProperty('--text-color', clientConfig.textColor);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          {isOffline ? <NoInternet /> : <Component {...pageProps} />}
          <Toaster />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

MyApp.getInitialProps = async ({ ctx }: any) => {
  const subdomain = ctx?.req?.headers?.host?.split('.')[0];

  let clientConfig;

  const res = await fetch(`https://config.flamapp.com/zingcam/client?env=prod&config=${subdomain}`);

  if (res.status === 200) {
    clientConfig = await res.json();
  } else {
    const resy = await fetch(`https://config.flamapp.com/zingcam/client?env=prod&config=default`);
    clientConfig = await resy.json();
  }

  return { clientConfig };
};

export default MyApp;
