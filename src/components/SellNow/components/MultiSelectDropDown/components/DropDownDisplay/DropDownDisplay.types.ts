export interface DropDownDisplayPropsInterface {
  label: "Material" | "Size" | "Brand" | "Condition" | "Color";
  placeholder: string;
  displayValue: string;
  isEmpty: boolean;
  handleDropDownDisplay: () => void;
}