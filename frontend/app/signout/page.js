"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Loader from "../(layout)/loader";
import { AppSessionContext } from "../app-session-context";

export default function Logout() {
  const router = useRouter();
  const { updateUser } = useContext(AppSessionContext);

  useEffect(() => {
    window.localStorage.removeItem("accessToken");
    updateUser(null);
    router.replace("/");
    // Todo: use either Strapi or Next to clear the "HttpOnly" cookie.
  }, []);

  return <Loader size="100" wrapperCls="z-10 flex justify-center items-center fixed inset-0" />;
}
