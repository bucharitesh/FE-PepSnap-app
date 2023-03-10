import React, { useEffect } from 'react';
// @ts-ignore
// eslint-disable-next-line import/extensions
import FlamSaasSDK from 'flamsdk/dist/FlamSaasSDK.min.js';
import { useVuplex } from '@/lib/hooks';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';
import { getClientData, getClientKey } from '@/lib/api';
import toast from 'react-hot-toast';

export function alphaNumericUUID() {
  let mask = '';
  const chars = '#A';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  let result = 'FBS';
  // eslint-disable-next-line no-plusplus
  for (let i = 5; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}

const Creation = () => {
  const { sendDataToVuplex } = useVuplex();
  const clientData = getClientData();

  useEffect(() => {
    (async () => {
      try {
        let KEY = '';
        const REF_ID = JSON.parse(localStorage.getItem('ref_id') || '');

        if (REF_ID) {
          if (clientData?.global_scan) {
            const res = await getClientKey(REF_ID);

            if (res.code === 200) {
              KEY = res?.data?.key;
            }
          } else {
            KEY = clientData?.private_key;
          }

          const SDK = await new FlamSaasSDK.init({
            environment: 'PRODUCTION',
            key: KEY,
          });

          const orderData = {
            color: '#5e0d2a',
            refId: REF_ID,
            // handleSuccess: async (data: any) => {
            handleSuccess: async () => {
              if (localStorage?.getItem('ref_id')) {
                toast.success('Video updated Successfully!');
                localStorage.removeItem('ref_id');
                setTimeout(() => {
                  sendDataToVuplex(VUPLEX_EVENTS.CREATION_DONE, 'Hogaya Creation');
                }, 3000);
              }
            },
            // handleFailure: (data: any) => {
            handleFailure: () => {
              if (localStorage?.getItem('ref_id')) {
                localStorage.removeItem('ref_id');
                throw new Error('Failed to update video for this Card!');
              }
            },
            handleClose: () => {
              if (localStorage?.getItem('ref_id')) {
                sendDataToVuplex(VUPLEX_EVENTS.CREATION_DONE, 'Hogaya Creation');
                document.getElementById('flam-sdk-wrapper')?.remove();
                localStorage.removeItem('ref_id');
              }
            },
          };

          // setTimeout(async () => {
          SDK?.updateOrder(orderData);
          // }, 1000);
        } else {
          setTimeout(() => {
            sendDataToVuplex(VUPLEX_EVENTS.CREATION_DONE, 'Hogaya Creation');
          }, 3000);
          throw new Error('Cant update video for this Card!');
        }

      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  return <div className='flex h-screen w-screen items-center justify-center'>Loading...</div>;
};

export default Creation;
