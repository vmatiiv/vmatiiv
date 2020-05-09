import * as React from 'react';
import { useSpring, animated } from 'react-spring';

// eslint-disable-next-line no-unused-vars
import { SwipeableWrapperProps, SwipeableState } from './SwipeableWrapper';

import directionEnum from '../constants/direction';
import { getOpacity } from '../utils/helpers';



const Swipeable = ({
  wrapperHeight = '100%',
  wrapperWidth = '100%',
  swipeThreshold = 120,
  fadeThreshold = 40,
  handleOnDragStart,
  handleForceSwipe,
  onOpacityChange,
  renderButtons,
  children,
  state,
}) => {
  console.log(state);
  const springProps = useSpring({
    immediate: state.pristine || (!state.forced && Math.abs(state.offset) >= swipeThreshold),
    config: {
      tension: 390,
      friction: 30,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 0.01,
      overshootClamping: true,
      lastVelocity: 1,
      mass: 0.1,
    },
    from: {
      opacity: 1,
      offset: 0,
    },
    to: {
      opacity: getOpacity(state.offset, swipeThreshold, fadeThreshold),
      offset: state.offset,
    },
  });
  // opacity: getOpacity(state.offset, swipeThreshold, fadeThreshold),
  
  // HACK: react-spring doesn't support Typescript in @8.0.0,
  // so we can't access properties from useSpring.

  // eslint-disable-next-line
  const opacity = springProps['opacity'].value;

  // eslint-disable-next-line
  const offset = springProps['offset'].value;

  const animatedStyle = {
    ...springProps,
    transform: `translateX(${offset}px) rotate(${offset / 10}deg)`,

    height: wrapperHeight,
    width: wrapperWidth,
    overflow:'visible',
    opacity
  };

  React.useEffect(() => {
    if (onOpacityChange) {
      onOpacityChange(opacity);
    }
  }, [
    onOpacityChange,
    opacity,
  ]);

  return (
    <>
      <animated.div
        onTouchStart={handleOnDragStart}
        onMouseDown={handleOnDragStart}
        style={animatedStyle}
      >
        {children}
      </animated.div>

      {
        renderButtons && (
          renderButtons({
            right: () => handleForceSwipe(directionEnum.RIGHT),
            left: () => handleForceSwipe(directionEnum.LEFT),
          })
        )
      }
    </>
  );
};

export default Swipeable;
