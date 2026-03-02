
/** @note: User Document Interface. */
export interface UserDocumentInterface {
  googleId: string | null;
  facebookId: string | null;
  appleId: string | null;
  fullname: string | null;
  username: string | null;
  email: string;
  avatar: string | null;
  password?: string | null;
  about: string | null;
  phoneNumber: {
    countryCode: string | null;
    nationalNumber: string | null;
  };
  dob: Date | null;
  gender: string;
  isVerfied: boolean;
  lastSeen: Date;
  type: string;
  status: string;
};


/** @note: AuthContext Type */
export interface AuthContextType {
    isAuthenticated:boolean,
    user:UserDocumentInterface | null,
    handleSetUser:(user:UserDocumentInterface) => void,
};

