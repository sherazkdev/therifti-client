import { useState } from "react";
import styles from "./LoginPage.module.css";

import SocialLogin from "./components/SocialLogin/SocialLogin";
import EmailLoginForm from "./components/EmailLogin/EmailLoginForm";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import OtpVerify from "./components/OtpVerify/OtpVerify";
import SignupSocial from "./components/SignUp/SignupSocial";
import SignupEmail from "./components/SignUp/SignupEmail";
import ChangePassword from "./components/ChangePassword/ChangePassword";

type Step =
  | "login-social"
  | "login-email"
  | "forgot"
  | "otp"
  | "change-password"
  | "signup-social"
  | "signup-email";

type OtpFlow = "FORGOT" | "SIGNUP" | "LOGIN";

interface response {
  email:string | null,
  userId:string | null
}

const LoginPage = () => {
  const [step, setStep] = useState<Step>("login-social");
  const [response, setResponse] = useState<response>({email:null,userId:null});
  const [otpFlow, setOtpFlow] = useState<OtpFlow>("LOGIN");
  
  return (
    <div className={styles.page}>
        
      {/* SOCIAL LOGIN */}
      {step === "login-social" && (
        <SocialLogin
          onEmail={() => setStep("login-email")}
          onSignup={() => setStep("signup-social")}
        />
      )}

      {/* LOGIN EMAIL */}
      {step === "login-email" && (
        <EmailLoginForm
          onForgot={() => setStep("forgot")}
          onSuccess={({email,userId}: response) => {
            setResponse({email:email,userId:userId});
            setOtpFlow("");
            setStep("otp");
          }}
        />
      )}

      {/* FORGOT PASSWORD */}
      {step === "forgot" && (
        <ForgotPassword
          onSubmit={({email,userId}: response) => {
            setResponse({email:email,userId:userId});
            setOtpFlow("forgot");
            setStep("otp");
          }}
        />
      )}

      {/* OTP */}
      {step === "otp" && (
        <OtpVerify
          response={response}
          type={otpFlow}
          onVerified={() => {
            if (otpFlow === "forgot") {
              setStep("change-password");
            }

            if (otpFlow === "signup") {
              alert("Signup OTP verified — go to dashboard next");
              setStep("login-social"); // TEMP
            }

            if (otpFlow === "login") {
              alert("Login OTP verified — backend next");
              setStep("login-social"); // TEMP
            }
          }}
        />
      )}

      {/* CHANGE PASSWORD */}
      {step === "change-password" && (
        <ChangePassword
          onSuccess={() => {
            alert("Password changed — go login");
            setStep("login-email");
          }}
        />
      )}

      {/* SIGNUP SOCIAL */}
      {step === "signup-social" && (
        <SignupSocial
          onEmail={() => setStep("signup-email")}
          onLogin={() => setStep("login-social")}
        />
      )}

      {/* SIGNUP EMAIL */}
      {step === "signup-email" && (
        <SignupEmail
          onSubmit={({email,userId}: response) => {
            setResponse({email:email,userId:userId});
            setOtpFlow("signup");
            setStep("otp");
          }}
        />
      )}
    </div>
  );
};

export default LoginPage;
