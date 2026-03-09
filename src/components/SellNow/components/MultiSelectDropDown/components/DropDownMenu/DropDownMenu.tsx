import { type FC } from "react";

import styles from "../../../../SellItem.module.css";
import type { DropDownMenuPropsInterface } from "./DropDownMenu.types";

const DropDownMenu: FC<DropDownMenuPropsInterface> = ({
  handletoggleOption,
  visible,
  isOptionSelected,
  getOptionLabel,
  getOptionKey,
}) => {
  return (
    <div className={styles.dropdownMenu}>
      {visible.map((opt: any) => (
        <div
          key={getOptionKey(opt)}
          className={styles.dropdownOption}
          onClick={() => handletoggleOption(opt)}
        >
          {getOptionLabel(opt)}
          <span
            className={`${styles.checkbox} ${
              isOptionSelected(opt) ? styles.checked : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;