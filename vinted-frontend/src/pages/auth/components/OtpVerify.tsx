import { useEffect, useRef, useState } from "react";
import styles from "./OtpVerify.module.css";

export default function OtpVerify({ email, onVerified }: any) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [time, setTime] = useState(10);      
  const [error, setError] = useState("");

  const inputsRef = useRef<HTMLInputElement[]>([]);

  // TIMER
  useEffect(() => {
    if (time <= 0) return;

    const t = setInterval(() => {
      setTime((p) => (p > 0 ? p - 1 : 0));
    }, 1000);

    return () => clearInterval(t);
  }, [time]);

  // INPUT CHANGE
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // If user pastes into a single box
    if (value.length > 1) {
      const digits = value.slice(0, 4).split("");
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });

      setOtp(newOtp);
      inputsRef.current[digits.length - 1]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError("");

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // BACKSPACE 
  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // PASTE ALL 4 
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();
  };


  const isComplete = otp.every((d) => d !== "");



//   plug in the real API inside handleVerify    on continue this handle 
  const handleVerify = async () => {
    try {
      const isValid = true; // for testing purppose only 

      if (!isValid) {
        setError("Invalid verification code. Please try again.");
        return;
      }

      onVerified(otp.join(""));
    } catch {
      setError("Something went wrong. Try again.");
    }
  };


//   on resent  this handle  add the api here
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    setTime(60);
    inputsRef.current[0]?.focus();
  };




  return (
    <div className={styles.card}>
      <h2>Enter verification code</h2>
      <p className={styles.email}>Sent to {email}</p>

      <div
        className={`${styles.otpContainer} ${
          error ? styles.otpError : ""
        }`}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {(inputsRef.current[i] = el!)}}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={styles.otpInput}
          />
        ))}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <button disabled={!isComplete} onClick={handleVerify}>
        Continue
      </button>

      {time > 0 ? (
        <p className={styles.timer}>
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </p>
      ) : (
        <span
          onClick={handleResend}
          role="button"
          tabIndex={0}
          className={styles.resend}
        >
          Resend code
        </span>
      )}
    </div>
  );
}
