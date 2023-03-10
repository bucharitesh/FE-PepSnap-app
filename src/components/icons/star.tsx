/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const Star = ({filled = false} : any) => {
  const clientConfig = JSON.parse(localStorage.getItem('clientConfig') as string);

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.0144 26.6892L18.015 26.6896L24.315 30.6896L24.3175 30.6911C25.9547 31.7238 27.8369 30.1552 27.3953 28.4123L27.3951 28.4113L25.5715 21.242C25.5714 21.2416 25.5713 21.2412 25.5712 21.2407C25.5676 21.2251 25.5683 21.2088 25.5734 21.1936C25.5785 21.1779 25.588 21.164 25.6007 21.1535L25.604 21.1508L31.2524 16.4396C31.2526 16.4394 31.2529 16.4392 31.2531 16.439C32.6465 15.2807 31.9927 12.8843 30.0783 12.7599L30.0777 12.7599L22.7027 12.2849L22.7027 12.2849L22.6966 12.2845C22.6893 12.2841 22.6823 12.2816 22.6764 12.2772C22.6706 12.2729 22.6661 12.267 22.6636 12.2601L22.6554 12.2388L19.9099 5.32505C19.7657 4.93881 19.5077 4.60524 19.1698 4.36859C18.8272 4.12869 18.4192 4 18.001 4C17.5828 4 17.1747 4.12869 16.8321 4.36859C16.4942 4.60524 16.2362 4.93881 16.0921 5.32505L13.3466 12.2388L13.3384 12.2601C13.3358 12.267 13.3314 12.2729 13.3255 12.2772C13.3197 12.2816 13.3127 12.2841 13.3054 12.2845L13.3054 12.2845L13.2992 12.2849L5.9242 12.7599L5.92367 12.7599C4.00922 12.8843 3.35548 15.2807 4.74877 16.439C4.74903 16.4392 4.7493 16.4394 4.74957 16.4396L10.3979 21.1508L10.4012 21.1535C10.4139 21.164 10.4234 21.1779 10.4286 21.1936C10.4336 21.2088 10.4343 21.2252 10.4307 21.2409C10.4306 21.2413 10.4305 21.2416 10.4304 21.242L8.74461 27.8852C8.74453 27.8856 8.74445 27.8859 8.74437 27.8862C8.25407 29.8079 10.3284 31.544 12.1244 30.4021C12.1247 30.4019 12.125 30.4017 12.1253 30.4015L17.986 26.6902L17.9876 26.6892C17.9916 26.6866 17.9962 26.6853 18.001 26.6853C18.0057 26.6853 18.0104 26.6866 18.0144 26.6892Z"
        stroke="#1D4ED8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.551 25.8453L24.851 29.8453C25.6635 30.3578 26.6635 29.5953 26.426 28.6578L24.601 21.4828C24.5516 21.284 24.5595 21.0752 24.6236 20.8806C24.6877 20.686 24.8056 20.5134 24.9635 20.3828L30.6135 15.6703C31.351 15.0578 30.976 13.8203 30.0135 13.7578L22.6385 13.2828C22.4372 13.2711 22.2438 13.2011 22.0817 13.0812C21.9197 12.9613 21.7961 12.7968 21.726 12.6078L18.976 5.68284C18.9032 5.48272 18.7706 5.30985 18.5961 5.18769C18.4217 5.06553 18.2139 5 18.001 5C17.788 5 17.5802 5.06553 17.4058 5.18769C17.2314 5.30985 17.0988 5.48272 17.026 5.68284L14.276 12.6078C14.2059 12.7968 14.0823 12.9613 13.9202 13.0812C13.7582 13.2011 13.5647 13.2711 13.3635 13.2828L5.98847 13.7578C5.02597 13.8203 4.65097 15.0578 5.38847 15.6703L11.0385 20.3828C11.1964 20.5134 11.3142 20.686 11.3783 20.8806C11.4425 21.0752 11.4503 21.284 11.401 21.4828L9.71347 28.1328C9.42597 29.2578 10.626 30.1703 11.5885 29.5578L17.451 25.8453C17.6154 25.7408 17.8062 25.6853 18.001 25.6853C18.1958 25.6853 18.3866 25.7408 18.551 25.8453Z"
        fill={filled ? clientConfig.primary : 'white'}
      />
    </svg>
  );
};

export default Star;