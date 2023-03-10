/* eslint-disable react/no-unescaped-entities */
import Star from '@/components/icons/star';
import { useVuplex } from '@/lib/hooks';
import React, { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';
import { postRating } from '@/lib/api';

// useless array to iterate 5 times
const ratings = [1, 1, 1, 1, 1];

const RateUS = () => {
  const { sendDataToVuplex } = useVuplex();

  const [rating, setRating] = useState<number>(0);

  const [ratingSumbitted, setRatingSubmitted] = useState(false);

  const handleRate = async (value: any) => {
    try {
      const res = await postRating(value);
      if (res.code === 201 || res.code === 200) {
        setRatingSubmitted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ref = useRef(null);

  const handleClose = () => {
    sendDataToVuplex(VUPLEX_EVENTS.CLOSE_MENU, 'hellooo close hojayega');
    setRatingSubmitted(false);
    setRating(0);
  };

  // const clientConfig = JSON.parse(localStorage.getItem('clientConfig') as string);

  // if (!clientConfig?.clientId) {
  //   sendDataToVuplex(VUPLEX_EVENTS.CLOSE_MENU, 'hellooo close hojayega');
  // }

  useOnClickOutside(ref, () => {
    if (ratingSumbitted) {
      handleClose();
    }
  });

  return (
    <div className="grid h-screen w-screen place-items-center bg-black/60">
      <div
        ref={ref}
        className="relative mx-4 grid w-full max-w-[22rem] place-items-center rounded-lg bg-white"
      >
        {ratingSumbitted && rating <= 3 && (
          <div className="absolute right-8 top-8 h-4 w-4" onClick={handleClose}>
            <Image src="/assets/images/close.svg" layout="fill" alt="" />
          </div>
        )}

        {!ratingSumbitted && (
          <Fragment>
            <div className="overflow-hidden rounded-t-lg bg-[#F3F4F6] px-2 py-8 text-center">
              <p className="text-lg font-bold">We’d love your feedback!</p>
              <p className="mt-3">If you’re enjoying the AR experiences, please give us 5 stars!</p>
            </div>
            <div className="mx-auto mt-0 flex w-4/5 items-center justify-between px-2 py-6">
              {ratings.map((_item, i) => {
                return (
                  <div
                    key={i}
                    onMouseOver={() => setRating(i + 1)}
                    onClick={() => handleRate(i + 1)}
                  >
                    <Star filled={rating >= i + 1} />
                  </div>
                );
              })}
            </div>
          </Fragment>
        )}
        {ratingSumbitted && (
          <Fragment>
            <div className="flex flex-col place-items-center rounded-lg bg-white p-8">
              <div className="relative h-48 w-48">
                <Image src={`/assets/images/Star_${rating}.svg`} layout="fill" alt="" />
              </div>
              <span className="text-lg font-extrabold text-[#10B981]">
                Thanks for the feedback!
              </span>
              <p className="mt-4 text-center">
                {rating <= 3
                  ? 'Your feedback is noted!'
                  : 'If you’re enjoying the AR experiences, please rate us on App Store'}
              </p>
              {rating > 3 && (
                <button className="mt-4 w-full rounded-lg bg-[#1545D3] p-4 text-white">
                  Open App Store
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default RateUS;
