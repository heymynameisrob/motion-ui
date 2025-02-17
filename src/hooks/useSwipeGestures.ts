import { useMotionValue, useTransform } from "motion/react";
import type { MotionValue, PanInfo } from "motion/react";

interface SwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  elasticity?: number;
  disabled?: boolean;
}

interface SwipeGestureResult {
  x: MotionValue<number>;
  opacity: MotionValue<number>;
  dragProps: {
    drag: "x" | boolean;
    dragConstraints: { left: number; right: number };
    dragElastic: number;
    onDragEnd: (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => void;
    style: { x: MotionValue<number>; opacity: MotionValue<number> };
  };
}

/** Resuable hook for x-axis swipe gestures using motion/react */
export function useSwipeGestures({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
  elasticity = 0.1,
  disabled,
}: SwipeGestureOptions = {}): SwipeGestureResult {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  };

  return {
    x,
    opacity,
    dragProps: {
      drag: disabled ? false : ("x" as const),
      dragConstraints: { left: 0, right: 0 },
      dragElastic: elasticity,
      onDragEnd: handleDragEnd,
      style: { x, opacity },
    },
  };
}

// Example
//
// function Carousel(){
// // swipe functions...
// const { dragProps } = useSwipeGestures({ onSwipeLeft, onSwipeRight});
//
// return <motion.div {...dragProps}>...</motion.div>
//
// }
