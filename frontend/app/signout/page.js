"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../(layout)/loader";

export default function Logout(props) {
  const router = useRouter();

  useEffect(() => {
    fetch("/signout").then((res) => {
      if (!res.ok) router.back();
      else {
        router.push("/");
      }
    });
  }, []);

  return <Loader size="100" wrapperCls="z-10 flex justify-center items-center fixed inset-0" />;
}
