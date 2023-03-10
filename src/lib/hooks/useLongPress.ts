import { useCallback, useRef, useState } from 'react';

const isTouchEvent = (event: any) => {
  return 'touches' in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = (
  onLongPress: any,
  onHoldLeave: any,
  onClick: any,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout: any = useRef<any>();
  const target = useRef();

  const start = useCallback(
    (event: any) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, onHoldLeave, delay, shouldPreventDefault]
  );

  const end = useCallback(
    (event: any, shouldTriggerClick = true) => {
      if (shouldTriggerClick && !longPressTriggered) onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        onHoldLeave(event);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  const clear = useCallback(
    (_event: any, shouldTriggerClick = true) => {
      if (timeout.current) clearTimeout(timeout.current);
      if (shouldTriggerClick && !longPressTriggered) onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        (target.current as any).removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: (e: any) => end(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};

export default useLongPress;
