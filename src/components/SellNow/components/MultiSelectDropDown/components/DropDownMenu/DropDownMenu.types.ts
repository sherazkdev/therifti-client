
export interface DropDownMenuPropsInterface {
    handletoggleOption:(opt:any) => void;
    visible:any,
    label:"Material" | "Size" | "Brand" | "Condition" | "Color",
    selected:any
}