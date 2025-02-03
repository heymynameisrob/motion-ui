import { PaintBrushIcon } from "@heroicons/react/16/solid";
import {
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/16/solid";
import React from "react";

export function Icons({ id }: { id: string }) {
  const icon = React.useMemo(() => {
    const className = "w-3 h-3 opacity-70";

    switch (id) {
      case "performance":
        return <WrenchScrewdriverIcon className={className} />;
      case "accessibility":
        return <UserCircleIcon className={className} />;
      case "design":
        return <PaintBrushIcon className={className} />;
      default:
        return null;
    }
  }, [id]);

  return icon;
}
