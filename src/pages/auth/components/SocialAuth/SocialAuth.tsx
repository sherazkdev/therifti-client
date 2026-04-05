import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import type { SocialAuthPropsInterface } from "../../../../types/components/index";
import styles from "./SocialAuth.module.css";

import { AppleIcon, FacebookIcon, GoogleIcon } from "../../../../assets/icons/svgs/svg";

import useUser from "../../../../hooks/server/auth/useUser";
import { saveRefreshToken,saveAccessToken } from "../../../../services/auth.services";
import type { SocialAuthInterface } from "../../../../types/components/index";

/** Note: Context */
import { AuthContext } from "../../../../contexts/auth/auth.context";

export default function SocialAuth({type,onEmailClick,onSwitchMode,onSocialAuth}: SocialAuthPropsInterface) {

  const [provider,setProvider] = useState<SocialAuthInterface | null>(null);
  
  const Redirect = useNavigate();
  const isSignIn = type === "SIGNIN";

  const {data,isLoading,refetch} = useUser();
  const searchParams = useSearchParams()[0];
  const {handleSetUser} = useContext(AuthContext);

  useEffect( () => {
    const accessToken = searchParams.get("accessToken");
    const provider = searchParams.get("provider");
    const refreshToken = searchParams.get("refreshToken");
    if(accessToken && refreshToken && provider){
      /** Note: Set Provider */
      setProvider(provider as SocialAuthInterface);
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
      setTimeout( () => {
        refetch();
      },100);
    }
  },[searchParams]);

  useEffect( () => {
    if(data){
      handleSetUser(data.data);
      Redirect("/",{replace:true});
    }
  },[data]);

  return (
    <div className={styles.card}>
      <h2>
        {isSignIn
          ? "Welcome back!"
          : "Join and sell pre-loved clothes with no fees"}
      </h2>

        <button onClick={ () => onSocialAuth("GOOGLE")} disabled={isLoading} className={isLoading && provider !== "GOOGLE" ? styles.isLoad : ""}>

          {provider === "GOOGLE" && isLoading ? (
            <div className="loader"></div>
          ):(
            <>
              <GoogleIcon /> Continue with Google
            </>
          )}
        </button>
        <button onClick={ () => onSocialAuth("APPLE")} disabled={isLoading} className={isLoading && provider !== "APPLE" ? styles.isLoad : ""}>
            {provider === "APPLE" && !isLoading ? (
              <div className="loader"></div>
            ):(
              <>
                <AppleIcon /> Continue with Apple
              </>
            )}
        </button>
        <button onClick={ () => onSocialAuth("FACEBOOK")} disabled={isLoading} className={isLoading && provider !== "FACEBOOK" ? styles.isLoad : ""}>
            {provider === "FACEBOOK" && isLoading ? (
              <div className="loader"></div>
            ):(
              <>
                <FacebookIcon /> Continue with Facebook
              </>
            )}
        </button>

      <p className={styles.link} onClick={onEmailClick}>
        {isSignIn
          ? <>Or log in with <span>email</span></>
          : <>Or register with <span>email</span></>}
      </p>

      <p className={styles.linkSmall}>
        {isSignIn ? (
          <>
            Don’t have an account?{" "}
            <span onClick={() => onSwitchMode("SIGNUP")}>Sign up</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => onSwitchMode("SIGNIN")}>Log in</span>
          </>
        )}
      </p>
    </div>
  );
}