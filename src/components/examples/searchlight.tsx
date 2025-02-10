import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";

export function SearchLight() {
  const ref = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentPos, setCurrentPos] = React.useState("10% 50%");

  // Clamp both X and Y coordinates
  const clampedX = useTransform(mouseX, [0, 100], [10, 90], { clamp: true });

  const clampedY = useTransform(mouseY, [0, 100], [10, 90], { clamp: true });

  const springX = useSpring(clampedX, {
    stiffness: 500,
    damping: 50,
  });

  const springY = useSpring(clampedY, {
    stiffness: 500,
    damping: 50,
  });

  const maskPosition = useMotionTemplate`${springX}% ${springY}%`;

  useMotionValueEvent(maskPosition, "change", (latest) => {
    setCurrentPos(latest);
  });

  const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate both X and Y percentages
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = Math.min(100, Math.max(0, (x / rect.width) * 100));
    const percentY = Math.min(100, Math.max(0, (y / rect.height) * 100));

    mouseX.set(percentX);
    mouseY.set(percentY);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="select-none grid place-items-center"
      style={
        {
          maskImage:
            "radial-gradient(circle at var(--mask-pos), black 25%, transparent 50%)",
          "--mask-pos": `${currentPos}`,
        } as React.CSSProperties
      }
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.2,
      }}
    >
      <h1 className="text-[clamp(3rem,_5vw,_6.5rem)]">Hello world</h1>
    </motion.div>
  );
}
