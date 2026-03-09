import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Signup.module.css";
import { EyeIcon } from "../../../../components/icons";

/** Note: Api Hooks */
import useRegister from "../../../../hooks/server/auth/useRegister";
import type { ApiError } from "../../../../types/api/apiError"; 
import type { SignUpEmailPropsInterface, SignUpFormInterface } from "./SignUp.types";
import { AUTH_ERROR_MESSAGES } from "../../../../constants/errors/auth.errors";

export default function SignUp({ onSubmit }: SignUpEmailPropsInterface) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError,setServerError] = useState<string | null>(null);
  const { register,handleSubmit,setError,formState: { errors}} = useForm<SignUpFormInterface>({mode: "onChange"});
  
  const registerMutation = useRegister();
  const isLoading = registerMutation.isPending;

  const handleSignup = async (data: SignUpFormInterface) => {
  try {

    // @note: Register Api Payload.
    const registerationPayload = {
      email:data.email,
      fullname:data.fullname,
      zipCode:Number(data.zipCode) || null,
      password:data.password,
      username:data.username
    };

    registerMutation.mutate(registerationPayload,{
      onError:(resErr) => {
        const err = resErr.response?.data as ApiError || undefined;
        if(err){
          if(err.message === "VALIDATION_FAILED"){
            setServerError(err.message);
            return;
          }
          if(err.message === "EMAIL_EXISTS") setError("email",{message:AUTH_ERROR_MESSAGES[err.message]})
          return;
        }
      },
      onSuccess:(res) => {
        onSubmit({email:data.email,userId:res.data.userId,resetToken:null})
      }
    });
  } catch (err) {
    console.error(err);
  }
  };

  return (
    <form
          className={styles.card}
          onSubmit={handleSubmit(handleSignup)}
    >
      <h2>Sign up with email</h2>
      
      {serverError && (<p className={styles.serverErrorAuth} >{serverError}</p>)}

      {/* FULL NAME */}
      <div className={styles.field}>
        <input
          placeholder="Full name"
          {...register("fullname", {
            required: "Name can’t be blank",
          })}
        />
        <p
          className={`${styles.help} ${
            errors.fullname ? styles.errorText : ""
          }`}
        >
          {errors.fullname?.message ||
            "Your full name will not be visible publicly"}
        </p>
      </div>

      {/* USERNAME */}
      <div className={styles.field}>
        <input
          placeholder="Username"
          {...register("username", {
            required: "Username can’t be blank",
          })}
        />
        <p
          className={`${styles.help} ${
            errors.username ? styles.errorText : ""
          }`}
        >
          {errors.username?.message ||
            "Other users will see this name on your account"}
        </p>
      </div>

      {/* EMAIL */}
      <div className={styles.field}>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter the email you want to use on Thrifty",
            },
          })}
        />
        <p
          className={`${styles.help} ${
            errors.email ? styles.errorText : ""
          }`}
        >
          {errors.email?.message ||
            "Enter the email you want to use on Thrifty"}
        </p>
      </div>

      {/* PASSWORD */}
      <div className={styles.field}>
        <div className={styles.passwordRow}>
          <input
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
          >
            <EyeIcon size={18} color="grey" />
          </button>
        </div>

        <p
          className={`${styles.help} ${
            errors.password ? styles.errorText : ""
          }`}
        >
          {errors.password?.message ||
            "Enter at least 7 characters, including at least 1 letter and at least 1 number"}
        </p>
      </div>

      {/* ZIP CODE */}
      <div className={styles.field}>
        <input
          placeholder="ZIP code (optional)"
          {...register("zipCode")}
        />
        <p className={styles.help}>
          This will be used to calculate shipping and availability.
        </p>
      </div>

      {/* TERMS */}
      <div className={styles.checkboxRow}>
        <label>
          <input
            type="checkbox"
            {...register("terms", {
              required:
                "Please accept the terms and conditions before registering.",
            })}
          />
          <span>
            By clicking sign up, I agree to Thrifty’s Terms &
            Conditions, confirm I’ve read the Privacy Policy,
            and certify I’m 18 years or older.
          </span>
        </label>

        {errors.terms && (
          <p className={styles.termsError}>
            {errors.terms.message}
          </p>
        )}
      </div>

      {/* SUBMIT */}
      <div className={styles.submitBtnDev}>
        <button type="submit" className={isLoading ? "submitBtnIsFetching" : styles.submitBtn} disabled={isLoading}>
          {isLoading ? (<div className="loader"></div>) : "Continue"}
        </button>
      </div>


    </form>
  );
}
