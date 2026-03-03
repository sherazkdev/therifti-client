import { useForm } from "react-hook-form";
import styles from "./ForgotPassword.module.css";

/** Types */
import type { ForgotPasswordFormInterface,ForgotPasswordPropsInterface } from "./ForgotPassword.types";
export default function ForgotPassword({ onSubmit }: ForgotPasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInterface>();

  // 👉 BACKEND WILL PLUG API HERE
  const handleForgotPassword = async (data:ForgotPasswordFormInterface) => {
    try {
      console.log("Forgot password email:", data.email);

      // MOCK SUCCESS
      alert(`Password reset requested for ${data.email}`);

      // later:
      // await api.post("/auth/forgot-password", data);
      onSubmit(data.email);   //move to the next page
    } catch {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <form
      className={styles.card}
      onSubmit={handleSubmit(handleForgotPassword)}
    >
      <h2>Forgot your password?</h2>

      <input
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />

      {errors.email && (
        <p className={styles.error}>{errors.email.message}</p>
      )}

      <button type="submit">Continue</button>
    </form>
  );
}
