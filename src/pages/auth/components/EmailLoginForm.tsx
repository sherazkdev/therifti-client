import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EmailLoginForm.module.css";
import { EyeIcon } from "../../../components/icons";

type Form = {
  email: string;
  password: string;
};

export default function EmailLoginForm({ onForgot}: any) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();


  //handler that get the form response 
  const handleLogin = async (data: Form) => {
  try {
    
    console.log("Login attempt:", data);

    alert(`Login attempt for ${data.email}`);

    
  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <form className={styles.card} onSubmit={handleSubmit(handleLogin)}>

      <h2>Log in</h2>

      {/* EMAIL */}
      <div className={styles.field}>
        <div className={styles.passwordRow}>
        <input
          className={styles.input}
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        </div>

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        
      </div>
      

      {/* PASSWORD */}
      <div className={styles.field}>
        <div className={styles.passwordRow}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{7,}$/,
                message:
                  "Enter at least 7 characters, including at least 1 letter and at least 1 number",
              },
            })}
          />

          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon size={18} />
          </button>
        </div>

        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      {/* SUBMIT */}
      <button type="submit" className={styles.submitBtn}>
        Continue
      </button>

      <span className={styles.link} onClick={onForgot}>
        Forgot your password?
      </span>
    </form>
  );
}
