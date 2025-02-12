import { Button } from "@/primitives/button";
import { ArrowDownIcon } from "@heroicons/react/16/solid";

export function IconButton() {
  return (
    <Button
      size="icon"
      className="group grid place-items-center rounded-full overflow-clip [&_>svg]:duration-300 [&_>svg]:ease-[var(--ease-in-out-circ)] scale-200"
    >
      <ArrowDownIcon className="w-4 h-4 opacity-70 col-[1] row-[1] -translate-y-[150%] group-hover:translate-y-0" />
      <ArrowDownIcon className="w-4 h-4 opacity-70 col-[1] row-[1] group-hover:translate-y-[150%]" />
    </Button>
  );
}
