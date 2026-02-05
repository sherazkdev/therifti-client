// src/components/icons/ChevronDown.tsx
type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ChevronDown = ({ size = 24, color = "currentColor", className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
};

export default ChevronDown;
