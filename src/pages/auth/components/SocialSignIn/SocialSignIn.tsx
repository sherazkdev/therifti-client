import styles from "./SocialSignIn.module.css";
import apple from "../../../../assets/icons/apple.svg";
import google from "../../../../assets/icons/google.svg";
import facebook from "../../../../assets/icons/facebook.svg";

/** Types */
import type { SocialSignInPropsInterface } from "./SocialSignIn.types";

export default function SocialSignIn({ onEmailSignUp,onSignInClick }: SocialSignInPropsInterface) {
  return (
    <div className={styles.card}>
      <h2>Welcome back!</h2>

      <button>
        <img src={google} /> Continue with Google
      </button>

      <button>
        <img src={apple} /> Continue with Apple
      </button>

      <button>
        <img src={facebook} /> Continue with Facebook
      </button>

      <p className={styles.link} onClick={onEmailSignUp}>
        Or log in with <span>email</span>
      </p>

      <p className={styles.linkSmall}>
        Don’t have an account? <span onClick={onSignInClick}>Sign up</span>
      </p>
    </div>
  );
}
