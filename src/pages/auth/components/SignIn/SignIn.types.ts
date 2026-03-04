import type { UserDocumentInterface } from "../../../../types/auth/auth.types";

/** @note: Email login form interface */
export interface EmailLoginFormInterface {
  email: string;
  password: string;
};

/** @note: Email login Props interface */
export interface EmailLoginPropsInterface {
  onForgot:() => void,
  onSuccess:(userDocument:UserDocumentInterface) => void
}