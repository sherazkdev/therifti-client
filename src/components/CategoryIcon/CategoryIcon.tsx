import type { FC, CSSProperties } from "react";
import { Package } from "lucide-react";
import type { CategoryDocument } from "../../types/api/category.types";
import DynamicIcon from "../DynamicIcon/DynamicIcon";

export type CategoryIconSource = Pick<CategoryDocument, "icon" | "image" | "title">;

export type CategoryIconProps = {
  category: CategoryIconSource;
  size?: number;
  className?: string;
  /** Applied to the image fallback (API `image` URL) */
  imageClassName?: string;
  style?: CSSProperties;
};

/**
 * Renders a category visual from API data: Lucide name in `icon`, else `image` URL, else a default.
 */
const CategoryIcon: FC<CategoryIconProps> = ({
  category,
  size = 18,
  className,
  imageClassName,
  style,
}) => {
  const iconName = typeof category.icon === "string" ? category.icon.trim() : "";
  const imageUrl = typeof category.image === "string" ? category.image.trim() : "";

  if (iconName) {
    return (
      <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
        <DynamicIcon iconName={iconName} size={size} />
      </span>
    );
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={category.title ?? ""}
        width={size}
        height={size}
        className={imageClassName ?? className}
        style={{
          objectFit: "cover",
          borderRadius: 4,
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      <Package size={size} strokeWidth={1.75} />
    </span>
  );
};

export default CategoryIcon;
