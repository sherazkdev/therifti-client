import { useState } from "react";
import styles from "./LoginPage.module.css";

import SocialLogin from "./components/SocialLogin";
import EmailLoginForm from "./components/EmailLoginForm";
import ForgotPassword from "./components/ForgotPassword";
import OtpVerify from "./components/OtpVerify";
import SignupSocial from "./components/SignupSocial";
import SignupEmail from "./components/SignupEmail";
import ChangePassword from "./components/ChangePassword";

type Step =
  | "login-social"
  | "login-email"
  | "forgot"
  | "otp"
  | "change-password"
  | "signup-social"
  | "signup-email";

type OtpFlow = "forgot" | "signup" | "login";

const LoginPage = () => {
  const [step, setStep] = useState<Step>("login-social");
  const [email, setEmail] = useState("");
  const [otpFlow, setOtpFlow] = useState<OtpFlow>("login");

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
          onSuccess={(mail: any) => {
            setEmail(mail);
            setOtpFlow("login");
            setStep("otp");
          }}
        />
      )}

      {/* FORGOT PASSWORD */}
      {step === "forgot" && (
        <ForgotPassword
          onSubmit={(mail: any) => {
            setEmail(mail);
            setOtpFlow("forgot");
            setStep("otp");
          }}
        />
      )}

      {/* OTP */}
      {step === "otp" && (
        <OtpVerify
          email={email}
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
          onSubmit={(mail: any) => {
            setEmail(mail);
            setOtpFlow("signup");
            setStep("otp");
          }}
        />
      )}
    </div>
  );
};

export default LoginPage;
