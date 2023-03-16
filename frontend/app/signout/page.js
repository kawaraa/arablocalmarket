"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Loader from "../(layout)/loader";
import { AppSessionContext } from "../app-session-context";

export default function Logout(props) {
  const router = useRouter();
  const { updateUser } = useContext(AppSessionContext);

  useEffect(() => {
    // Todo: use either Strapi or Next to clear the "HttpOnly" cookie.
    // Once the cookie is cleared, call updateUser(null) then router.push("/");
  }, []);

  return <Loader size="100" wrapperCls="z-10 flex justify-center items-center fixed inset-0" />;
}
