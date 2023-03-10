import axios from 'axios';
import jwtDecode from "jwt-decode";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getClientData = () => {
  return JSON.parse(localStorage.getItem('deviceData') as string);
};

export const postRating = async (rate: number) => {
  const deviceData = getClientData();
  const res = await http.post(`/order/rate`, {
    device_id: deviceData?.device_id,
    client_id: deviceData?.clientId,
    rating: rate,
    message: '',
  });
  return res?.data;
};

export const getClientKey = async (flamcardId: string) => {
  try {
    const res = await http.get(`/order/client-key/${flamcardId}`);
    if (res?.data?.code === 200) {
      const decoded: any = jwtDecode(res?.data?.data?.key);

      return {
        code: 200,
        data: {
          key: decoded?.client_key
        }
      };
    }
    return {
      code: 500,
      message: "video cannot be updated for this Card."
    };
  } catch (err: any) {
    return {
      code: 500,
      message: "video cannot be updated for this Card.",
      data: err?.response || err,
      errorMsg: err
    };
  }
};

// 'https://dev.flamapp.com/zingcam/'
