import { useState, useRef, useEffect, type FC } from "react";

import styles from "../../SellItem.module.css";

/** Types */
import type { MultiSelectDropDownPropsInterface } from "../../../../types/components/index";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import DropDownDisplay from "./components/DropDownDisplay/DropDownDisplay";

/**
 * Generic MultiSelectDropdown with type T
 */
const MultiSelectDropdown: FC<MultiSelectDropDownPropsInterface> = ({
  label,
  options,
  selected,
  onChange,
  error,
  singleSelect,
  maxSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isSingle = !!singleSelect;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getOptionKey = (option: any): string => {
    if (typeof option === "string") {
      return option;
    }

    if (option && typeof option === "object" && "_id" in option && typeof option._id === "string") {
      return option._id;
    }

    return JSON.stringify(option);
  };

  const getOptionLabel = (option: any): string => {
    if (typeof option === "string") {
      return option;
    }

    if (option && typeof option === "object") {
      if ("brand" in option) {
        return (option as any).brand;
      }

      if ("material" in option) {
        return (option as any).material;
      }

      if ("international" in option && "US" in option) {
        const size = option as any;
        return `${size.international} / ${size.US}`;
      }
    }

    return String(option);
  };

  const isOptionSelected = (option: any): boolean => {
    if (isSingle) {
      if (!selected) return false;
      return getOptionKey(selected) === getOptionKey(option);
    }

    const selectedArray: any[] = Array.isArray(selected) ? selected : [];
    return selectedArray.some((item) => getOptionKey(item) === getOptionKey(option));
  };

  const handleToggleOption = (option: any) => {
    if (isSingle) {
      if (selected && getOptionKey(selected) === getOptionKey(option)) {
        onChange(null);
      } else {
        onChange(option);
      }
      setOpen(false);
      return;
    }

    const selectedArray: any[] = Array.isArray(selected) ? selected : [];
    const exists = selectedArray.some((item) => getOptionKey(item) === getOptionKey(option));

    if (exists) {
      const next = selectedArray.filter((item) => getOptionKey(item) !== getOptionKey(option));
      setMaxReached(false);
      onChange(next);
      return;
    }

    if (maxSelect && selectedArray.length >= maxSelect) {
      setMaxReached(true);
      return;
    }

    const next = [...selectedArray, option];
    setMaxReached(false);
    onChange(next);
  };

  const handleDropDownDisplay = () => setOpen((prev) => !prev);

  const placeholder = (() => {
    if (label === "Brand") return "Select Brand";
    if (label === "Condition") return "Select Condition";

    if (label === "Color") {
      const max = maxSelect ?? 2;
      return `Select up to ${max} colors`;
    }

    if (label === "Material") {
      const max = maxSelect ?? 3;
      return `Select up to ${max} materials`;
    }

    if (label === "Size") return "Select Size";

    return "Select";
  })();

  let isEmpty = false;
  let displayValue = "";

  if (isSingle) {
    if (!selected) {
      isEmpty = true;
    } else {
      displayValue = getOptionLabel(selected);
    }
  } else {
    const selectedArray: any[] = Array.isArray(selected) ? selected : [];
    isEmpty = selectedArray.length === 0;
    displayValue = selectedArray.map((opt) => getOptionLabel(opt)).join(", ");
  }

  if (isEmpty) {
    displayValue = placeholder;
  }

  const maxErrorMessage =
    !error && maxReached && maxSelect
      ? `You can select up to ${maxSelect} ${label.toLowerCase()}${maxSelect > 1 ? "s" : ""}.`
      : "";

  return (
    <div className={styles.formGroup} ref={ref}>
      <label>{label}</label>

      <DropDownDisplay
        label={label}
        placeholder={placeholder}
        displayValue={displayValue}
        isEmpty={isEmpty}
        handleDropDownDisplay={handleDropDownDisplay}
      />

      {(error || maxErrorMessage) && (
        <span className={styles.error}>{error ?? maxErrorMessage}</span>
      )}

      {open && (
        <DropDownMenu
          handletoggleOption={handleToggleOption}
          visible={options}
          isOptionSelected={isOptionSelected}
          getOptionLabel={getOptionLabel}
          getOptionKey={getOptionKey}
        />
      )}
    </div>
  );
};

export default MultiSelectDropdown;