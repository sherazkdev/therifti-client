import type { SocialAuthPropsInterface } from "./SocialAuth.typs";
import styles from "./SocialAuth.module.css";


import apple from "../../../../assets/icons/apple.svg";
import google from "../../../../assets/icons/google.svg";
import facebook from "../../../../assets/icons/facebook.svg";

export default function SocialAuth({type,onEmailClick,onSwitchMode,onSocialAuth}: SocialAuthPropsInterface) {

  const isSignIn = type === "SIGNIN";

  return (
    <div className={styles.card}>
      <h2>
        {isSignIn
          ? "Welcome back!"
          : "Join and sell pre-loved clothes with no fees"}
      </h2>

        <button onClick={ () => onSocialAuth("GOOGLE")}>
            <img src={google} /> Continue with Google
        </button>
        <button onClick={ () => onSocialAuth("APPLE")}>
            <img src={apple} /> Continue with Apple
        </button>
        <button onClick={ () => onSocialAuth("FACEBOOK")}>
            <img src={facebook} /> Continue with Facebook
        </button>

      <p className={styles.link} onClick={onEmailClick}>
        {isSignIn
          ? <>Or log in with <span>email</span></>
          : <>Or register with <span>email</span></>}
      </p>

      <p className={styles.linkSmall}>
        {isSignIn ? (
          <>
            Don’t have an account?{" "}
            <span onClick={() => onSwitchMode("SIGNUP")}>Sign up</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => onSwitchMode("SIGNIN")}>Log in</span>
          </>
        )}
      </p>
    </div>
  );
}