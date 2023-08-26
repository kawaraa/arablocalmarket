"use client";
import { useContext, useEffect, useRef } from "react";
import { AppSessionContext } from "../app-session-context";
import { Cookies } from "../(service)/utilities";
import { request } from "../(service)/api-provider";

export default function AuthCallback({ params, searchParams }) {
  const { lang, setAppLoading, addMessage } = useContext(AppSessionContext);
  const firstRenderRef = useRef(false);

  const confirmAccount = async () => {
    setAppLoading(true);
    try {
      Cookies.remove("accessToken");
      window.localStorage.removeItem("accessToken");

      const res = await request("googleOAuth", "GET", {
        query: `access_token=${searchParams.access_token}`,
      });
      Cookies.set("accessToken", res.jwt);
      window.localStorage.setItem("accessToken", res.jwt);

      const name = (window.localStorage.getItem("name") || "").split("::");
      if (name && name[1]) {
        const body = { firstName: name[0], lastName: name[1] };
        await request("updateUser", "PUT", { query: res.user?.id, body });
        window.localStorage.removeItem("name");
      }
      window.location.href = "/";
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
      setAppLoading(false);
    }
  };

  useEffect(() => {
    if (!firstRenderRef.current && searchParams.access_token) confirmAccount();
    firstRenderRef.current = true;
  }, []);

  return (
    <div className="text-xl font-semibold w-full h-[70vh] flex justify-center items-center">
      {content.message[lang]} ...
    </div>
  );
}

const content = {
  message: { en: "Verifying your account", ar: "يتم التحقق من حسابك" },
};
