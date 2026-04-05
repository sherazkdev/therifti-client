import React from "react";

import * as Icons from "lucide-react";

type DynamicIconProps = {
  iconName?: string | null;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size = 24,
  className,
  strokeWidth,
}) => {
  const name = typeof iconName === "string" ? iconName.trim() : "";
  const Cmp = name
    ? (Icons as unknown as Record<string, React.ElementType | undefined>)[name]
    : undefined;

  if (Cmp == null) {
    return <Icons.Package size={size} className={className} strokeWidth={strokeWidth ?? 1.75} />;
  }

  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
};

export default DynamicIcon;
