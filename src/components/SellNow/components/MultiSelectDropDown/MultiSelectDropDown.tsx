import { useState, useRef, useEffect, type FC } from "react";

import styles from "../../SellItem.module.css";

/** Types */
import type { MultiSelectDropDownProps } from "./MultiSelectDropDown.types";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import DropDownDisplay from "./components/DropDownDisplay/DropDownDisplay";

/**
 * Generic MultiSelectDropdown with type T
 */
const MultiSelectDropdown: FC<MultiSelectDropDownProps> = ({
  label,
  options,
  selected,
  onChange,
  error,
  singleSelect,
  maxSelect,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get unique identifier (for objects or strings)
  const getId = (option: any) => typeof option[0] === "string" ? option : option._id;

  const handletoggleOption = (option:any) => {
    
    if(singleSelect){
      onChange(option);
      setOpen(false);
      return;
    }

    if(Array.isArray(selected) && selected?.length >= (maxSelect as number)){
      return;
    }

    if (label === "Material") {
      // selected ko ensure karo array hai
      const selectedArray:any = Array.isArray(selected) ? selected : [];
      // Duplicate check
      const isDuplicate = selectedArray.some((s:any) => s?._id === option._id);
      if (isDuplicate) {
        return;
      }

      // Not duplicate → add
      onChange(option);
    }

    if(label === "Color"){
      const selectedArray:any = Array.isArray(selected) ? selected : [];

      const isDuplicate = selectedArray.some((s:string) => s === option);
      if (isDuplicate) {
        return;
      }

      onChange(option);
    }

    if(label === "Size"){
      const selectedArray:any = Array.isArray(selected) ? selected : [];

      const isDuplicate = selectedArray.some((s:any) => s?._id === option._id);
      if (isDuplicate) {
        return;
      }
      onChange(option);
    }
  };

  const handleDropDownDisplay = () => setOpen(!open);
  return (
    <div className={styles.formGroup} ref={ref}>
      <label>{label}</label>

      <DropDownDisplay label={label} selected={selected} handleDropDownDisplay={handleDropDownDisplay} />

      {error && <span className={styles.error}>{error}</span>}

      {open && (
        <DropDownMenu handletoggleOption={handletoggleOption} label={label} selected={selected} visible={options} />
      )}
    </div>
  );
};

export default MultiSelectDropdown;