import * as React from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { CalculatorIcon } from "@heroicons/react/16/solid";
import { DraftingCompass, SquareAsteriskIcon, Variable } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationVariant = {
  scale: number;
  y: number;
  bounce: number;
};

type AnimationConfig = {
  layoutTransition: Omit<MotionProps["transition"], "type"> & {
    type: "spring";
  };
  contentTransition: Omit<MotionProps["transition"], "type"> & {
    type: "spring";
  };
  variants: {
    open: {
      width: string | number;
      height: string | number;
    };
    closed: {
      width: string | number;
      height: string | number;
    };
  };
};

export function Calculator() {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef(null);

  const animationConfig = React.useMemo<AnimationConfig>(
    () => ({
      layoutTransition: {
        type: "spring",
        bounce: open ? 0.3 : 0.4,
      },
      contentTransition: {
        type: "spring",
        bounce: open ? 0.3 : 0.4,
        originX: 1,
        originY: 1,
      },
      variants: {
        open: {
          width: 200,
          height: "auto",
        },
        closed: {
          width: 40,
          height: 40,
        },
      },
    }),
    [open],
  );

  const content = React.useMemo(() => {
    return open ? (
      <MenuItems />
    ) : (
      <CalculatorIcon className="w-4 h-4 text-primary" />
    );
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="h-[400px]" ref={ref}>
      <div
        className="relative h-full w-full  p-4" // Modified
        onClick={() => setOpen((prev) => !prev)}
      >
        <motion.div
          layout
          transition={animationConfig.layoutTransition}
          style={{
            borderRadius: 32,
            position: "absolute",
            bottom: 16, // to match p-4
            left: 16, // to match p-4
          }}
          className={cn(
            " overflow-hidden rounded-full bg-base-1 border focus shadow-2xl",
            !open && "hover:bg-base-3",
          )}
        >
          <motion.div
            layout
            variants={animationConfig.variants}
            initial="closed"
            animate={open ? "open" : "closed"}
            transition={animationConfig.contentTransition}
            style={{
              transformOrigin: "bottom left",
            }}
            className="flex items-center justify-center cursor-pointer"
            key={String(open)}
          >
            <AnimatePresence mode="popLayout">{content}</AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function MenuItems() {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <motion.div
      role="menu"
      aria-label="List of calculator menu items"
      className="w-full flex flex-col gap-1 p-2"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            type: "spring",
            duration: 0.4,
            bounce: 0.8,
            staggerChildren: 0.05,
            delayChildren: 0.3,
          },
        },
      }}
    >
      <MenuItem
        isSelected={selected === 0}
        onSelectChange={() => setSelected(0)}
      >
        <SquareAsteriskIcon className="w-6 h-6" />
        Basic
      </MenuItem>
      <MenuItem
        isSelected={selected === 1}
        onSelectChange={() => setSelected(1)}
      >
        <Variable className="w-6 h-6" />
        Scientifc
      </MenuItem>
      <MenuItem
        isSelected={selected === 2}
        onSelectChange={() => setSelected(2)}
      >
        <DraftingCompass className="w-6 h-6" />
        Maths notes
      </MenuItem>
    </motion.div>
  );
}

function MenuItem({
  children,
  isSelected,
  onSelectChange,
}: {
  children: React.ReactNode;
  isSelected?: boolean;
  onSelectChange: () => void;
}) {
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 60, filter: "blur(3px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      role="menuitem"
      aria-selected={isSelected}
      aria-label={`Select ${children} calculator mode`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectChange();
      }}
      className="shrink-0 flex items-center bg-transparent gap-4 p-4 h-12 rounded-[24px] hover:bg-base-2 text-primary text-[15px] font-medium cursor-pointer aria-selected:text-orange-600 dark:aria-selected:text-orange-400"
    >
      {children}
    </motion.button>
  );
}
