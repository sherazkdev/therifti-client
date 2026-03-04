import { useForm } from "react-hook-form";
import styles from "./ChangePassword.module.css";

/** Types */
import type { ChangePasswordFormInterface, ChangePasswordPropsInterface } from "./ChatPassword.types";

/** Hooks */
import useVerifyForgotAccountResetTokenAndChangePassword from "../../../../hooks/server/useVerifyForgotAccountResetTokenAndChangePassword";
import type { ApiError } from "../../../../types/api/api.interfaces";

export default function ChangePassword({ onSuccess,otpRequest }: ChangePasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormInterface>();

  const password = watch("password");
  const resetPasswordMutation = useVerifyForgotAccountResetTokenAndChangePassword();

  // BACKEND WILL PLUG API HERE
  const handleChangePassword = async (data: ChangePasswordFormInterface) => {
    try {
      const {confirmPassword} = data;

      const changePasswordPayload = {
        password:confirmPassword,
        userId:otpRequest.userId as string,
        resetToken:otpRequest.resetToken as string
      };
      console.log(changePasswordPayload);

      resetPasswordMutation.mutate(changePasswordPayload,{
        onError(err) {
          if(err.response && err.response.data){
            const Error = err.response.data as ApiError || undefined;
            if(Error){
              console.log(Error);
            }
          }
        },
        onSuccess(res) {
          if(res.success === true && res.statusCode === 200){
            console.log(res);
          }
        }
      })
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

      <button type="submit" className={resetPasswordMutation.isPending ? styles.submitBtnIsFetching : styles.submitBtn} disabled={resetPasswordMutation.isPending}>
        {resetPasswordMutation.isPending ? (<div className="spinner"></div>) : "Submit"}
      </button>
    </form>
  );
}
