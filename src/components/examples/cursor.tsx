import React from "react";
import { motion } from "motion/react";
import { useFollowPointer } from "@/hooks/useFollowPointer";
import { Button } from "@/primitives/button";

export function Cursor() {
  const [showCursor, setShowCursor] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  const handleCursor = () => {
    setShowCursor((prev) => !prev);
  };

  React.useLayoutEffect(() => {
    document.documentElement.style.cursor = showCursor
      ? "url(/multiplayer-cursor.svg), auto"
      : "auto";
  }, [showCursor]);

  return (
    <>
      <Button onClick={handleCursor}>
        {showCursor ? "Cursor on" : "Cursor off"}
      </Button>

      <motion.div
        ref={ref}
        style={{ x, y, opacity: showCursor ? 1 : 0 }}
        aria-hidden
        className="fixed z-50 pointer-events-none will-change-transform origin-top-left text-sm font-medium inline-flex items-center px-2 rounded-md bg-[#18A0FB] border border-black/5 shadow text-white"
      >
        You
      </motion.div>
    </>
  );
}
