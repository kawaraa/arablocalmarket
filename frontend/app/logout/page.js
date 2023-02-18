"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../(layout)/loader";

export default function Logout(props) {
  const router = useRouter();

  useEffect(() => {
    fetch("/logout").then((res) => {
      if (!res.ok) router.back();
      else {
        router.push("/");
      }
    });
  }, []);

  return <Loader size="100" wrapperCls="z10 flex justify-center items-center fixed inset-0 bg-[#ffffffdc]" />;
}
