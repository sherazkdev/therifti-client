type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};


const MoveRight = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => {
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
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </svg>
  );
};

export default MoveRight;
