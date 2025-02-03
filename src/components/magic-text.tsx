import { motion, useScroll, useTransform } from "motion/react";

export const MagicText = ({
  title,
  delay = 0,
}: {
  title: string;
  delay?: number;
}) => {
  // Split into words, then letters, while preserving word boundaries
  const words = title.split(" ").map((word) => word.split(""));

  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.97]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["blur(0px)", "blur(2px)"],
  );

  if (!words.length) return null;

  return (
    <motion.div style={{ y, opacity, filter, scale }}>
      <span className="sr-only">{title}</span>
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}`}
          className="inline-flex"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
                delayChildren: wordIndex * 0.15 + delay,
              },
            },
          }}
        >
          {word.map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              className="inline-block"
              variants={{
                hidden: { y: 8, originY: 0.2, opacity: 0, filter: "blur(2px)" },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    duration: 0.4,
                    bounce: 0.15,
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
          {/* Add space between words, but not after the last word */}
          {wordIndex !== words.length - 1 && (
            <span className="inline-block w-[0.25em]" />
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};
