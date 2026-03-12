import { useForm } from "react-hook-form";
import styles from "./ChangePassword.module.css";

/** Types */
import type { ChangePasswordFormInterface, ChangePasswordPropsInterface } from "../../../../types/components/index";

/** Hooks */
import useVerifyForgotAccountResetTokenAndChangePassword from "../../../../hooks/server/auth/useVerifyForgotAccountResetTokenAndChangePassword";
import type { ApiError } from "../../../../types/api/api.types";
import { useState } from "react";
import { AUTH_ERROR_MESSAGES } from "../../../../constants/errors/auth.errors";

export default function ChangePassword({ otpRequest }: ChangePasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormInterface>();
  const [serverError,setServerError] = useState<string | null>(null);
  const [isPasswordChanges,setIsPasswordChanged] = useState<boolean>(false);

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

      resetPasswordMutation.mutate(changePasswordPayload,{
        onError(err) {
          if(err.response && err.response.data){
            const Error = err.response.data as ApiError || undefined;
            if(Error){              
              if(Error.message === "VALIDATION_FAILED"){
                setServerError(Error.message);
                return;
              }
              setServerError(AUTH_ERROR_MESSAGES[Error.message])
              return;
            }
          }
        },
        onSuccess(res) {
          if(res.success === true && res.statusCode === 200){
            setIsPasswordChanged(true);
          }
        }
      })
    } catch(err:any) {
      return;
    }
  };

  return (
    <form
      className={styles.card}
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <h2>Change password</h2>
      {!isPasswordChanges ? (
        <>
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
        </>
      ): (
        <p>Your password has been changed successfully.</p>
      )}
    </form>
  );
}
