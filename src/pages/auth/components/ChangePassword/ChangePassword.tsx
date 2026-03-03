import { useForm } from "react-hook-form";
import styles from "./ChangePassword.module.css";

/** Types */
import type { ChangePasswordFormInterface, ChangePasswordPropsInterface } from "./ChatPassword.types";

export default function ChangePassword({ onSuccess }: ChangePasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormInterface>();

  const password = watch("password");

  // 👉 BACKEND WILL PLUG API HERE
  const handleChangePassword = async (data: ChangePasswordFormInterface) => {
    try {
      console.log("Change password:", data);

      alert("Password changed successfully (mock)");

      // later:
      // await api.post("/auth/reset-password", data);
      // onSuccess();
    } catch {
      alert("Failed to change password");
    }
  };

  return (
    <form
      className={styles.card}
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <h2>Change password</h2>

      {/* NEW PASSWORD */}
      <input
        placeholder="New password"
        type="password"
        {...register("password", {
          required: "Password required",
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d).{7,}$/,
            message:
              "Enter at least 7 characters, including at least 1 letter and at least 1 number",
          },
        })}
      />

      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      {/* CONFIRM PASSWORD */}
      <input
        placeholder="Reenter your new password"
        type="password"
        {...register("confirmPassword", {
          required: "Confirm your password",
          validate: (val:string) =>
            val === password || "Passwords do not match",
        })}
      />

      {errors.confirmPassword && (
        <p className={styles.error}>
          {errors.confirmPassword.message}
        </p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
