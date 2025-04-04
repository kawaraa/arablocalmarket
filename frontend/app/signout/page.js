"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Loader from "../(layout)/loader";
import { AppSessionContext } from "../app-session-context";
import { Cookies } from "../(service)/utilities";

export default function Logout() {
  const router = useRouter();
  const { updateUser } = useContext(AppSessionContext);

  useEffect(() => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("accessToken");
    Cookies.remove("accessToken");
    updateUser(null);
    router.replace("/");

    // Todo: use either Strapi or Next to clear the "HttpOnly" cookie.
  }, []);

  return <Loader size="100" screen />;
}
