import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

export interface FormValues {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

export interface PriceInputPropInterface  {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};