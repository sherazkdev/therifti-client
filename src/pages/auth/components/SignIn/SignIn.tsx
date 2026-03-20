import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.css";
import { EyeIcon } from "../../../../assets/icons/svgs/svg";

/** @note: Hook */
import useLogin from "../../../../hooks/server/auth/useLogin";

/** Types */
import type { EmailLoginFormInterface, EmailLoginPropsInterface } from "../../../../types/components/index";
import type { ApiError } from "../../../../types/api/api.types"; 
import { AUTH_ERROR_MESSAGES } from "../../../../constants/errors/auth.errors";
import { saveRefreshToken,saveAccessToken } from "../../../../services/auth.services";

export default function SignIn({ onForgot, onSuccess}: EmailLoginPropsInterface) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError,setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailLoginFormInterface>();

  const loginMutation = useLogin();
  const isLoading = loginMutation.isPending;
  

  //handler that get the form response 
  const handleLogin = async (data: EmailLoginFormInterface) => {
    try {
      loginMutation.mutate(data,{
        onError(error) {
          if(error.response && error.response.data){
            const err = error.response.data as ApiError || undefined;
            if(err){
              if(err.message === "VALIDATION_FAILED"){
                setServerError(err.message);
                return;
              }
              if(err.message === 'EMAIL_NOT_FOUND'){
                setServerError(AUTH_ERROR_MESSAGES.EMAIL_NOT_FOUND);
              }else if(err.message === "INVALID_CREDENTIALS"){
                setServerError(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
              }
            }
          }
        },
        onSuccess(res) {
          if(res.success === true && res.statusCode === 200){
              const {user,tokens:{accessToken,refreshToken}} = res.data;
              saveRefreshToken(refreshToken);
              saveAccessToken(accessToken);
              onSuccess(user);
          }
        }
      });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit(handleLogin)}>

      <h2>Log in</h2>
      {serverError && (<p className={styles.serverErrorAuth} >{serverError}</p>)}
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
      <button type="submit" className={isLoading ? "submitBtnIsFetching" : styles.submitBtn} disabled={isLoading}>
        {isLoading ? (<div className="loader"></div>) : "Continue"}
      </button>

      <span className={styles.link} onClick={onForgot}>
        Forgot your password?
      </span>
    </form>
  );
}
