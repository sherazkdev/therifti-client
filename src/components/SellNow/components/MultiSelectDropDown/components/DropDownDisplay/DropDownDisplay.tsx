import { type FC } from "react";
import { ChevronDown } from "lucide-react";
import type { DropDownDisplayPropsInterface } from "./DropDownDisplay.types";

import styles from "../../../../SellItem.module.css";

const DropDownDisplay: FC<DropDownDisplayPropsInterface> = ({
  label,
  placeholder,
  displayValue,
  isEmpty,
  handleDropDownDisplay,
}) => {
  return (
    <div className={styles.dropdownDisplay} onClick={handleDropDownDisplay}>
      <span>{isEmpty ? placeholder : displayValue}</span>
      <ChevronDown size={16} />
    </div>
  );
};

export default DropDownDisplay;