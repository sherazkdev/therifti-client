import styles from "./SignupSocial.module.css";

import apple from "../../../assets/icons/apple.svg";
import google from "../../../assets/icons/google.svg";
import facebook from "../../../assets/icons/facebook.svg";

export default function SignupSocial({ onEmail, onLogin }: any) {
  return (
    <div className={styles.card}>
      <h2>Join and sell pre-loved clothes with no fees</h2>

      <button>
        <img src={google} /> Continue with Google
      </button>
      <button>
        <img src={apple} /> Continue with Apple
      </button>
      <button>
        <img src={facebook} /> Continue with Facebook
      </button>

      <p className={styles.link} onClick={onEmail}>
        Or register with <span>email</span>
      </p>

      <p className={styles.linkSmall}>
        Already have an account? <span onClick={onLogin}>Log in</span>
      </p>

          
    </div>
  );
}
