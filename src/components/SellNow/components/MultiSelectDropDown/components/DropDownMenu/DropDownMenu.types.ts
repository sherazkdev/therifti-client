export interface DropDownMenuPropsInterface {
  handletoggleOption: (opt: any) => void;
  visible: any[];
  isOptionSelected: (opt: any) => boolean;
  getOptionLabel: (opt: any) => string;
  getOptionKey: (opt: any) => string;
}