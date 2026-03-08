export interface DropDownDisplayPropsInterface {
    selected:any,
    label:"Material" | "Size" | "Brand" | "Condition" | "Color",
    handleDropDownDisplay: () => void;
}