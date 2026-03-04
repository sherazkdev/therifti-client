import { useForm } from "react-hook-form";
import styles from "./ForgotPassword.module.css";

/** Note: Forgot account use hook */
import useForgot from "../../../../hooks/server/useForgot";

/** Types */
import type { ForgotPasswordFormInterface,ForgotPasswordPropsInterface } from "./ForgotPassword.types";
export default function ForgotPassword({ onSubmit, }: ForgotPasswordPropsInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInterface>();

  const forgotMutation = useForgot();

  // 👉 BACKEND WILL PLUG API HERE
  const handleForgotPassword = async (data:ForgotPasswordFormInterface) => {
    try {
      const forgotAccuntPayload:ForgotPasswordFormInterface = data;
      
      /** @note: Api Calling */
      forgotMutation.mutate(forgotAccuntPayload,{
        onError:(err) => {
          console.log(err.response);
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
