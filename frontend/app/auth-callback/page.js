"use client";
import { useContext, useEffect, useRef } from "react";
import { AppSessionContext } from "../app-session-context";
import { Cookies } from "../(service)/utilities";
import { request } from "../(service)/api-provider";

export default function AuthCallback({ params, searchParams }) {
  const { lang, setAppLoading, addMessage } = useContext(AppSessionContext);
  const firstRenderRef = useRef(false);

  const updateUserName = async (data) => {
    setAppLoading(true);
    try {
      Cookies.remove("accessToken");
      window.localStorage.removeItem("accessToken");

      const res = await request(`/api/auth/google/callback?`, "GET", {
        query: `access_token=${searchParams.access_token}`,
      });
      Cookies.set("accessToken", res.jwt);
      window.localStorage.setItem("accessToken", res.jwt);

      await request("updateUser", "PUT", { query: res.user?.id, body: data });
      window.location.href = "/";
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
      setAppLoading(false);
    }
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      let name = window.localStorage.getItem("name") || "";
      if (searchParams.access_token && name) {
        name = name.split("::");
        updateUserName({ firstName: name[0], lastName: name[1] });
        window.localStorage.removeItem("name");
      }

      firstRenderRef.current = true;
    }
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
