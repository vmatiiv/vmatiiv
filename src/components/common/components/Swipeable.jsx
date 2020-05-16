import * as React from 'react';
import { useSpring, animated } from 'react-spring';

// eslint-disable-next-line no-unused-vars
import { SwipeableWrapperProps, SwipeableState } from './SwipeableWrapper';
import {getAnimation} from '../utils/helpers'



const Swipeable = ({
  wrapperHeight = '100%',
  wrapperWidth = '100%',
  swipeThreshold = 200,
  fadeThreshold = 100,
  handleOnDragStart,
  handleForceSwipe,
  onOpacityChange,
  onAfterSwipe,
  renderButtons,
  children,
  state,
}) => {
  console.log(state.after)
  const springProps = useSpring({
    immediate: state.pristine || (!state.forced && Math.abs(state.offset) >= swipeThreshold),
    config: {
      tension: 170,
      friction: 100,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 0.01,
      overshootClamping: true,
      lastVelocity: 1,
      mass: 2,
    },
    from: {
      offset: 0,
      // opacity:1
    },
    to: {
      // opacity: getOpacity(state.offset, swipeThreshold, fadeThreshold),
      // opacity:1,
      offset:state.offset
    },
  });
  // opacity: getOpacity(state.offset, swipeThreshold, fadeThreshold),
  
  // HACK: react-spring doesn't support Typescript in @8.0.0,
  // so we can't access properties from useSpring.

  // eslint-disable-next-line
  // const opacity = springProps['opacity'].value;

  // eslint-disable-next-line
  const offset = !state.after ? springProps['offset'].value : springProps['offset'].value * 5;

  const animatedStyle = {
    ...springProps,
    transform: `translateX(${offset}px) rotate(${offset / 10}deg)`,

    height: wrapperHeight,
    width: wrapperWidth,
    overflow:'visible',
    

  };

  // React.useEffect(() => {
  //   if (onOpacityChange) {
  //     onOpacityChange(opacity);
  //   }
  // }, [
  //   onOpacityChange,
  //   opacity,
  // ]);

  return (
      <animated.div
        onTouchStart={handleOnDragStart}
        onMouseDown={handleOnDragStart}
        style={animatedStyle}
      >
        {children}
      </animated.div>
  );
};

export default Swipeable;
