import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignupEmail.module.css";
import { EyeIcon } from "../../../components/icons";

type Form = {
  name: string;
  username: string;
  email: string;
  password: string;
  zip?: string;
  terms: boolean;
};

export default function SignupEmail({ onSubmit }: any) {
  const [showPassword, setShowPassword] = useState(false);


 const handleSignup = async (data: Form) => {
  try {
    alert("jk")
    console.log("Signup form data:", data);

    //  BACKEND WILL PLUG API HERE

    // After success:
    onSubmit(data.email);   
  } catch (err) {
    console.error(err);
  }
};

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: "onChange",
  });

  return (
    <form
          className={styles.card}
          onSubmit={handleSubmit(handleSignup)}
    >
      <h2>Sign up with email</h2>

      {/* FULL NAME */}
      <div className={styles.field}>
        <input
          placeholder="Full name"
          {...register("name", {
            required: "Name can’t be blank",
          })}
        />
        <p
          className={`${styles.help} ${
            errors.name ? styles.errorText : ""
          }`}
        >
          {errors.name?.message ||
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
          {...register("zip")}
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
      <button
        type="submit"
        disabled={!isValid}
        className={styles.submitBtn}
      >
        Continue
      </button>
    </form>
  );
}
