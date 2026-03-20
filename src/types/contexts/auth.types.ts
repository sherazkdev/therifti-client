import type { UserDocumentInterface } from "../api";

/** @note: AuthContext Type */
export interface AuthContextType {
    isAuthenticated:boolean,
    user:UserDocumentInterface | null,
    handleSetUser:(user:UserDocumentInterface) => void,
};
