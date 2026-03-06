import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import OtpVerify from "./components/OtpVerify/OtpVerify";
import SignUp from "./components/SignUp/SignUp";
import EmailSignIn from "./components/SignIn/SignIn";
import ChangePassword from "./components/ChangePassword/ChangePassword";

/** Interfaces */
import type { OtpRequestInterface,AuthFlow,AuthSteps, SocialAuthInterface } from "./Auth.types";
import SocialAuth from "./components/SocialAuth/SocialAuth";

/** Contexts*/
import { AuthContext } from "../../contexts/auth/AuthContext";
import type { UserDocumentInterface } from "../../types/auth/auth.types";

const AuthPage = () => {
  const [step, setStep] = useState<AuthSteps>("SOCIAL-AUTH");
  const [otpRequest, setOtpRequest] = useState<OtpRequestInterface>({email:null,userId:null,resetToken:null});
  const [authFlow, setAuthFlow] = useState<AuthFlow>("SIGNUP");
  
  /** Note: Contexts */
  const {handleSetUser} = useContext(AuthContext);

  /** Note: Redirection */
  const Redirect = useNavigate();

  /** Note: Handle click on forgot account */
  const handleClickOnForgot = () => setStep("FORGOT");

  /** Note: Handle Forgot on submit */
  const handleForgotOnSubmit = (optObject:OtpRequestInterface) => {
    const {email,resetToken,userId} = optObject;
    setAuthFlow("FORGOT");
    setOtpRequest({email,resetToken,userId});
    setStep("OTP");
  };

  /** Note: Handle Login on success */
  const handleSignInOnSuccess = (userDocument:any) => {
    handleSetUser(userDocument);
    Redirect("/",{replace:true});
  }

  /** Note: Handle Otp on Submit */
  const handleOtpOnSuccess = (userDocument?:UserDocumentInterface | null ,resetToken?:string | null) => {
    if(authFlow === "SIGNUP") {
      handleSetUser(userDocument as UserDocumentInterface);
      Redirect("/",{replace:true});
    }else if(authFlow === "FORGOT"){
      alert("Note: Handle Submit otp Submited");
      setOtpRequest( (prev) => ({...prev,resetToken:resetToken as string}))
      setStep("CHANGE-PASSWORD");
    }
  };

  /** Note: Handle change password on success */
  const handleChangePasswordOnSuccess = () => {};

  /** Note: Handle signUp on sumit */
  const handleSignUpSubmit = (otpRequest:OtpRequestInterface) => {
    const {email,resetToken,userId} = otpRequest;
    setOtpRequest({email,resetToken,userId});
    /** @note:Verify Otp form. */
    setStep("OTP");
    return;
  };

  /** Note: Handle on Social auth */
  const handleOnSocialAuth = (type:SocialAuthInterface) => {
    if(type === "GOOGLE"){
      // window.open(import.meta.env.VITE_SERVER_URL + "/auth/google","_blank","width=/500px;height=200px");
      window.location.href = import.meta.env.VITE_SERVER_URL + "/auth/google";
      window.close();
    }else if(type === "FACEBOOK"){
      window.location.href = import.meta.env.VITE_SERVER_URL + "/auth/facebook";
    }
  };

  /** Note: handle on Switch Auth*/
  const handleOnSwitchAuth = () => {
    setAuthFlow((prev) =>
      prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"
    );
  };

  /** Note: Handle on email click */
  const handleOnEmailClick = () => {
    if (authFlow === "SIGNIN") {
      setStep("SIGNIN-EMAIL");
      // setAuthFlow(null);
    } else {
      setStep("SIGNUP-EMAIL");
      // setAuthFlow(null);
    }
  };
  return (
    <div className={styles.page}>
        
      {/* SOCIAL Auth */}
      {step === "SOCIAL-AUTH" && (
        <SocialAuth 
          onEmailClick={handleOnEmailClick}
          onSocialAuth={handleOnSocialAuth}
          onSwitchMode={handleOnSwitchAuth}
          type={authFlow}

        />
      )}

      {/* SignIn EMAIL */}
      {step === "SIGNIN-EMAIL" && (
        <EmailSignIn
          onForgot={handleClickOnForgot}
          onSuccess={handleSignInOnSuccess

          }
        />
      )}

      {/* FORGOT PASSWORD */}
      {step === "FORGOT" && (
        <ForgotPassword
          onSubmit={handleForgotOnSubmit}
        />
      )}

      {/* OTP */}
      {step === "OTP" && (
        <OtpVerify
          otpRequest={otpRequest}
          type={authFlow}
          onSuccess={handleOtpOnSuccess}
        />
      )}

      {/* CHANGE PASSWORD */}
      {step === "CHANGE-PASSWORD" && (
        <ChangePassword
          onSuccess={handleChangePasswordOnSuccess}
          otpRequest={otpRequest}
        />
      )}

      {/* SIGNUP EMAIL */}
      {step === "SIGNUP-EMAIL" && (
        <SignUp
          onSubmit={handleSignUpSubmit}
        />
      )}
    </div>
  );
};

export default AuthPage;
