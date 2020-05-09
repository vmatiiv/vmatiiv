import * as React from 'react';

// eslint-disable-next-line no-unused-vars
import directionEnum from '../constants/direction';

import {
  getDirection,
  getOffset,
  withX,
  getLimitOffset,
} from '../utils/helpers';

import Swipeable from './Swipeable';

const INITIAL_STATE = {
  start: 0,
  offset: 0,
  forced: false,
  swiped: false,
  moving: false,
  pristine: true,
};


const SwipeableWrapper = (props) => {
  const [state, setState] = React.useState(INITIAL_STATE);

  const stateRef = React.useRef(state);

  stateRef.current = state;

  const {
    swipeThreshold = 120,
    onBeforeSwipe,
    onAfterSwipe,
    onSwipe,
  } = props;

  const handleResetState = React.useCallback(() => {
    setState(INITIAL_STATE);

    setState({
      ...stateRef.current,
      offset: 0,
      start: 0,
    });
  }, []);

  const handleOnAfterSwipe = React.useCallback(() => {
    if (onAfterSwipe) {
      onAfterSwipe();
    }

    handleResetState();
  }, [
    handleResetState,
    onAfterSwipe,
  ]);

  const handleOnSwipe = React.useCallback((direction) => {
    if (onSwipe) {
      onSwipe(direction);
    }

    setState({
      ...stateRef.current,
      offset: getLimitOffset(swipeThreshold, direction),
      moving: false,
      swiped: true,
    });

    handleOnAfterSwipe();
  }, [
    handleOnAfterSwipe,
    swipeThreshold,
    onSwipe,
  ]);

  const handleOnBeforeSwipe = React.useCallback((direction) => {
    if (!onBeforeSwipe) {
      handleOnSwipe(direction);
      return;
    }

    onBeforeSwipe(
      (_direction) => handleOnSwipe(_direction || direction),
      handleResetState,
      direction,
    );
  }, [
    handleResetState,
    onBeforeSwipe,
    handleOnSwipe,
  ]);

  const handleOnDragStart = React.useCallback(withX((start) => {
    if (stateRef.current.swiped) {
      return;
    }

    setState({
      ...stateRef.current,
      pristine: false,
      moving: true,
      start,
    });
  }), []);

  const handleOnDragEnd = React.useCallback(() => {
    if (stateRef.current.swiped || !stateRef.current.moving) {
      return;
    }

    if (Math.abs(stateRef.current.offset) >= swipeThreshold) {
      handleOnBeforeSwipe(getDirection(stateRef.current.offset));
      return;
    }

    handleResetState();
  }, [
    handleOnBeforeSwipe,
    handleResetState,
    swipeThreshold,
  ]);

  const handleOnDragMove = React.useCallback(withX((end) => {
    if (stateRef.current.swiped || !stateRef.current.moving) {
      return;
    }

    setState({
      ...stateRef.current,
      offset: getOffset(stateRef.current.start, end),
    });
  }), []);

  const handleForceSwipe = React.useCallback((direction) => {
    if (stateRef.current.swiped) {
      return;
    }

    setState({
      ...stateRef.current,
      pristine: false,
      forced: true,
    });

    handleOnBeforeSwipe(direction);
  }, [
    handleOnBeforeSwipe,
  ]);

  React.useEffect(() => {
    window.addEventListener('touchmove', handleOnDragMove);
    window.addEventListener('mousemove', handleOnDragMove);
    window.addEventListener('touchend', handleOnDragEnd);
    window.addEventListener('mouseup', handleOnDragEnd);

    return () => {
      window.removeEventListener('touchmove', handleOnDragMove);
      window.removeEventListener('mousemove', handleOnDragMove);
      window.removeEventListener('touchend', handleOnDragEnd);
      window.removeEventListener('mouseup', handleOnDragEnd);
    };
  }, [
    handleOnDragMove,
    handleOnDragEnd,
  ]);

  return (
    <Swipeable
      handleOnDragStart={handleOnDragStart}
      handleForceSwipe={handleForceSwipe}
      state={stateRef.current}
      {...props}
    />
  );
};

export default SwipeableWrapper;
