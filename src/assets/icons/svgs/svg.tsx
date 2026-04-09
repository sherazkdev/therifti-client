
import React from "react";

/** Note: Google Icon SVG */
export const GoogleIcon = () => <svg fill="none" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M23.754 12.23c0-.852-.06-1.625-.204-2.417H12.24v4.646h6.46c-.277 1.5-1.13 2.774-2.402 3.626v3.014h3.878c2.27-2.09 3.578-5.163 3.578-8.825v-.043Z"></path><path fill="#34A853" d="M12.24 24.004c3.242 0 5.955-1.08 7.948-2.905l-3.878-3.014c-1.08.72-2.449 1.14-4.07 1.14-3.121 0-5.775-2.113-6.723-4.946h-4.01v3.11c1.98 3.926 6.039 6.615 10.733 6.615Z"></path><path fill="#FBBC04" d="M5.517 14.279a7.21 7.21 0 0 1-.372-2.281c0-.792.132-1.56.372-2.281v-3.11h-4.01a11.964 11.964 0 0 0-1.273 5.39c0 1.934.468 3.77 1.273 5.392l4.01-3.11Z"></path><path fill="#E94235" d="M12.24 4.77c1.765 0 3.35.6 4.586 1.801l3.446-3.445C18.195 1.193 15.47.004 12.24.004 7.546-.008 3.488 2.68 1.507 6.607l4.01 3.11c.948-2.834 3.59-4.947 6.723-4.947Z"></path></svg>;

/** Note: Apple Icon SVG */
export const AppleIcon = () => <svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="#000" d="M15.646 5.199Q16.749 3.9 16.749 2.4q0-.198-.02-.4-.77.04-1.633.458a4.5 4.5 0 0 0-1.426 1.061c-.75.84-1.171 1.868-1.171 2.828q.001.2.023.38c1.164.093 2.237-.5 3.124-1.528"></path><path fill="#000" d="M19.602 15.75q-1.378-1.266-1.399-3.181-.023-2.458 2.255-3.827-1.273-1.792-3.822-1.994-.94-.08-2.298.404-1.439.522-1.69.523-.336-.002-1.525-.444-1.191-.442-1.922-.443a5 5 0 0 0-2.485.695 5.1 5.1 0 0 0-1.838 1.842Q3.999 10.78 4 12.79q0 1.755.65 3.627.604 1.733 1.545 3.043.877 1.228 1.462 1.733.916.844 1.837.805.605-.019 1.588-.413.981-.392 1.836-.392.817 0 1.787.392.969.393 1.66.392.96-.022 1.796-.784.54-.465 1.398-1.674.627-.886 1.085-1.933.189-.444.356-.927a4.6 4.6 0 0 1-1.398-.909"></path></svg>;

/** @note: Facebook Icon SVG */
export const FacebookIcon = () => <svg fill="none" viewBox="0 0 24 24" width="20" height="20"><path fill="#0866FF" d="M24 12.004c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.627 3.875 10.35 9.101 11.647v-7.98H6.627v-3.667H9.1v-1.58c0-4.084 1.849-5.977 5.858-5.977.76 0 2.073.149 2.61.298v3.324c-.284-.03-.776-.045-1.387-.045-1.967 0-2.728.745-2.728 2.683v1.297h3.92l-.674 3.667h-3.246v8.245C19.396 23.198 24 18.139 24 12.004Z"></path><path fill="#fff" d="m16.7 15.671.673-3.667h-3.92v-1.297c0-1.938.761-2.683 2.728-2.683.611 0 1.104.015 1.387.044V4.745c-.537-.15-1.849-.299-2.61-.299-4.009 0-5.857 1.894-5.857 5.978v1.58H6.626v3.667h2.475v7.98a12.021 12.021 0 0 0 4.352.265V15.67H16.7Z"></path></svg>;



export type IconPropsInterface = {
  size?: number;
  color?: string;
  bgColor?: string;
  filled?: boolean;
  strokeWidth?: number;
  className?: string;
  style?:any,
  onClick?: () => void
};

const Wrapper = ({
  size,
  bgColor,
  children,
}: {
  size: number;
  bgColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: bgColor || "transparent",
        borderRadius: "50%",
      }}
    >
      {children}
    </div>
  );
};

export const TailOutIcon = ({
  size = 13,
  color = "#edf2f2",
  className,
  style,
  onClick
}:IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 8 13"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ color, ...style }}
    >
      <title>tail-out</title>

      <path
        opacity="0.13"
        d="M5.188,1H0v11.193l6.467-8.625C7.526,2.156,6.958,1,5.188,1z"
      />

      <path
        fill="currentColor"
        d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
      />
    </svg>
  );
};

export const TailInIcon = ({
  size = 13,
  color = "#edf2f2",
  className,
  style,
  onClick
}: IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 8 13"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ color, ...style }}
    >
      <title>tail-in</title>

      <path
        opacity="0.13"
        fill="none"
        d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
      />

      <path
        fill="currentColor"
        d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
      />
    </svg>
  );
};

export const UndoIcon = ({
  size = 24,
  color = "#d04555",
  className,
  style,
  onClick
}: IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ color, ...style }}
    >
      <path
        fill="currentColor"
        d="M12 1C5.924 1 1 5.926 1 12c0 6.075 4.924 11 11 11 6.074 0 11-4.925 11-11 0-6.074-4.926-11-11-11M2.5 12a9.5 9.5 0 0 1 15.666-7.227L4.773 18.166A9.46 9.46 0 0 1 2.5 12.002Zm3.334 7.227L19.227 5.834a9.46 9.46 0 0 1 2.273 6.167c0 5.246-4.254 9.499-9.5 9.499a9.46 9.46 0 0 1-6.166-2.273"
      />
    </svg>
  );
};

export const InfoIcon = ({
  size = 24,
  color = "currentColor",
  className,
  style,
  onClick
}: IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ color, ...style }}
    >
      <path
        fill="currentColor"
        d="M13 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 3a.75.75 0 0 0-.75.75v5.5a.75.75 0 0 0 1.5 0v-5.5A.75.75 0 0 0 12 10"
      />

      <path
        fill="currentColor"
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m0-1.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19"
      />
    </svg>
  );
};

export const DeleteIcon = ({
  size = 24,
  color = "#d04555",
  className,
  onClick,
  style,
}: IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ color, ...style }}
    >
      <path
        fill="currentColor"
        d="M9.75 8a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5A.75.75 0 0 1 9.75 8m4.5 0a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75"
      />

      <path
        fill="currentColor"
        d="M8.25 4V2.75C8.25 1.784 9.034 1 10 1h4c.966 0 1.75.784 1.75 1.75V4h4.5a.75.75 0 0 1 0 1.5h-1.214v14.75c0 1.61-1.457 2.75-3.036 2.75H8c-1.58 0-3.036-1.14-3.036-2.75V5.5H3.75a.75.75 0 0 1 0-1.5zm1.5-1.25V4h4.5V2.75A.25.25 0 0 0 14 2.5h-4a.25.25 0 0 0-.25.25m7.786 2.75H6.464v14.75c0 .6.59 1.25 1.536 1.25h8c.945 0 1.536-.65 1.536-1.25z"
      />
    </svg>
  );
};

export const CloseIcon = ({
  size = 24,
  color = "currentColor",
  className,
  style,
  onClick
}: IconPropsInterface) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ color, ...style }}
    >
      <path
        fill="currentColor"
        d="M4.213 4.213a.727.727 0 0 1 1.029 0L12 10.972l6.759-6.759a.727.727 0 1 1 1.028 1.029L13.029 12l6.758 6.759a.727.727 0 0 1-1.028 1.028L12 13.029l-6.758 6.758a.727.727 0 0 1-1.029-1.028L10.972 12 4.213 5.242a.727.727 0 0 1 0-1.029"
      />
    </svg>
  );
};

export const FilterIcon = ({
  size = 24,
  color = "#727580",
  bgColor,
  onClick
}:IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg
        onClick={onClick}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6112 21.0884L14.1153 20.2363L12.9144 19.5256L12.4102 20.3777L13.6112 21.0884ZM9.88465 20.2363L10.3888 21.0884L11.5898 20.3777L11.0856 19.5256L9.88465 20.2363ZM12.4102 20.3777C12.3668 20.4473 12.3063 20.5046 12.2345 20.5444C12.1628 20.5842 12.0821 20.6051 12 20.6051C11.9179 20.6051 11.8372 20.5842 11.7655 20.5444C11.6937 20.5046 11.6332 20.4473 11.5898 20.3777L10.3888 21.0884C11.1079 22.3042 12.8912 22.3042 13.6112 21.0884L12.4102 20.3777ZM10.6046 3.39535H12.6977C13.083 3.39535 13.3953 3.08299 13.3953 2.69767C13.3953 2.31236 13.083 2 12.6977 2H10.6046V3.39535Z"
          fill={color}
        />

        <path
          d="M19 2L19 8"
          stroke="#D1D5DC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M22 5L16 5"
          stroke="#D1D5DC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M8.27734 9.20923H15.7192M8.27734 12.465H13.3936"
          stroke="#D1D5DC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
};

export const ArrowLeftIcon = ({
  size = 24,
  color = "currentColor",
  className,
  style,
}: IconPropsInterface) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={{ color, ...style }}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M13.015 4.23a.727.727 0 0 1-.033 1.028l-6.416 6.015h12.707a.727.727 0 1 1 0 1.454H6.566l6.416 6.015a.727.727 0 1 1-.995 1.061L4.23 12.531a.727.727 0 0 1 0-1.062l7.757-7.272a.727.727 0 0 1 1.028.033"
      />
    </svg>
  );
};

/** Note: Heart Icon */
export const Heart = ({
  size = 24,
  color = "currentColor",
  filled = false,
  strokeWidth = 2,
  bgColor,
  className,
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </Wrapper>
  );
};

export const FilledHeart = ({
  size = 24,
  color = "red",
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg viewBox="0 0 16 16" width={size} height={size} onClick={onClick}>
        <path
          fill={color}
          d="M4.74 1.25c-.766 0-1.584.21-2.402.735C.809 2.967.158 4.518.26 6.129c.1 1.585.92 3.204 2.266 4.47 1.654 1.558 3.486 3.042 4.408 3.77a1.716 1.716 0 0 0 2.132 0c.922-.728 2.753-2.211 4.407-3.77 1.346-1.266 2.166-2.885 2.267-4.47.101-1.61-.55-3.162-2.078-4.144-.819-.526-1.637-.735-2.402-.735-1.2 0-2.186.634-2.822 1.182"
        />
      </svg>
    </Wrapper>
  );
};

export const EyeIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg
        onClick={onClick}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </Wrapper>
  );
};

export const ChevronDown = ({
  size = 24,
  color = "currentColor",
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg
        onClick={onClick}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Wrapper>
  );
};

export const MapPin = ({
  size = 24,
  color = "currentColor",
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg
        onClick={onClick}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
      >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </Wrapper>
  );
};

export const MoveLeft = ({
  size = 24,
  color = "currentColor",
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg width={size} height={size} onClick={onClick} viewBox="0 0 24 24" stroke={color}>
        <path d="M6 8L2 12L6 16" />
        <path d="M2 12H22" />
      </svg>
    </Wrapper>
  );
};

export const MoveRight = ({
  size = 24,
  color = "currentColor",
  bgColor,
  onClick
}: IconPropsInterface) => {
  return (
    <Wrapper size={size} bgColor={bgColor}>
      <svg width={size} height={size} onClick={onClick} viewBox="0 0 24 24" stroke={color}>
        <path d="M18 8L22 12L18 16" />
        <path d="M2 12H22" />
      </svg>
    </Wrapper>
  );
};