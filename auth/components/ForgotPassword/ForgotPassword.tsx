import { useForm } from "react-hook-form";
import styles from "./ForgotPassword.module.css";

/** Note: Forgot account use hook */
import useForgot from "../../../../hooks/server/auth/useForgot";

/** Types */
import type { ForgotPasswordFormInterface,ForgotPasswordPropsInterface } from "./ForgotPassword.types";
import { AUTH_ERROR_MESSAGES } from "../../../../constants/errors/auth.errors";
import type { ApiError } from "../../../../types/api/api.interfaces";
import { useState } from "react";
export default function ForgotPassword({ onSubmit, }: ForgotPasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInterface>();
  const [serverError,setServerError] = useState<string | null>(null);

  const forgotMutation = useForgot();
  const isLoading = forgotMutation.isPending;

  // 👉 BACKEND WILL PLUG API HERE
  const handleForgotPassword = async (data:ForgotPasswordFormInterface) => {
    try {
      const forgotAccuntPayload:ForgotPasswordFormInterface = data;
      
      /** @note: Api Calling */
      forgotMutation.mutate(forgotAccuntPayload,{
        onError:(err) => {
          if(err.response && err.response.data){
            const Error = err.response.data as ApiError || undefined;
            if(Error){
              if(Error.errorCode === "VALIDATION_FAILED"){
                setServerError(Error.message);
                return;
              }
              setServerError(AUTH_ERROR_MESSAGES[Error.errorCode])
              return;
            }
          }
        },
        onSuccess:(res) => {
          if(res.statusCode === 200 && res.success === true){
            onSubmit({email:data.email,resetToken:null,userId:res.data.userId});
          }
        }
      })

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
      {serverError && (<p className={styles.serverErrorAuth} >{serverError}</p>)}

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

      <button type="submit" className={isLoading ? "submitBtnIsFetching" : styles.submitBtn} disabled={isLoading}>
        {isLoading ? (<div className="spinner"></div>) : "Continue"}
      </button>

    </form>
  );
}
