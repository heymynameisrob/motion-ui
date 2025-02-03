import * as React from "react";
import { frame, useMotionValue, useSpring } from "motion/react";
import type { RefObject } from "react";

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const spring = { bounce: 0, dampness: 0, restDelta: 0.001 };
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  React.useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - (element.offsetLeft - element.offsetWidth));
        yPoint.set(clientY - (element.offsetTop - element.offsetHeight));
      });
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, xPoint, yPoint]);

  return { x, y };
}
