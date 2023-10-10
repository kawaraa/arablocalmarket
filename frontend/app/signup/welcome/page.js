"use client";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";
import { Cookies } from "../../(service)/utilities";

export default function Signup() {
  const router = useRouter();
  const { lang, user, refetchUser } = useContext(AppSessionContext);
  const checkStartedRef = useRef(false);

  const checkConfirmation = async (data, times = 1) => {
    checkStartedRef.current = true;
    const response = await request("signIn", "POST", data).catch(() => null);

    if (!response?.user?.confirmed && times < 20) setTimeout(() => checkConfirmation(data, times + 1), 15000);
    else if (response?.user?.confirmed) {
      window.localStorage.setItem("accessToken", response.jwt);
      Cookies.set("accessToken", response.jwt);
      refetchUser();
    }
  };

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if ((!credentials && !checkStartedRef.current) || user?.id) router.replace("/store");
    if (!checkStartedRef.current) checkConfirmation(credentials);
    localStorage.removeItem("credentials");
  }, [user]);

  return (
    <div className="min-h-[80vh] pt-3 px-4 flex justify-center items-center flex-col ">
      <h1 className="font-semibold text-center leading-10">
        <span className="text-4xl text-pc2">{content.h1[lang][0]}</span>
        <br />
        <span className="text-xl">{content.h1[lang][1]}</span> <span className="text-5xl">&#128077;</span>
      </h1>
      <p>{content.p[lang][0]}</p>
      <p>{content.p[lang][1]}</p>
    </div>
  );
}

const content = {
  h1: { en: ["Thanks!", "Your account has been created"], ar: ["شكرًا!", "لقد تم إنشاء حسابك"] },
  p: {
    en: [
      "A confirmation Email is sent to your Email address",
      "Please go to your Email inbox and confirm your Email address",
    ],
    ar: [
      "تم إرسال بريد إلكتروني للتأكيد عنوان بريدك الإلكتروني",
      "يرجى الذهاب إلى صندوق البريد الإلكتروني الخاص بك وتأكيد عنوان البريد الإلكتروني الخاص بك",
    ],
  },
};
