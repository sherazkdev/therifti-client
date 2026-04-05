import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleAuth = () => {
  useEffect(() => {
    if (!window.google) return;
    console.log(window.google)
    window.google.accounts.id.prompt((notification: any) => {
        console.log("Prompt status:", notification);
      });
    window.google.accounts.id.initialize({
      client_id: "299471675904-4kqi3q36bkjgglb87v00lm37ujpcafi0.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential;

    await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  };

  return null; // koi UI nahi, sirf popup
};

export default GoogleAuth;