"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Profile from "./(component)/profile";
import Account from "./(component)/account";

export default function Settings(props) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  console.log(user);

  const handleUpdate = async (data) => {
    try {
      if (!data.address) setAppLoading(true);
      console.log("changeFirstName:>>> ", data);
      if (!data.address) setAppLoading(false);
      addMessage({ type: "success", text: content.done[lang], duration: 2 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    document.title = "Admin Settings - ALM";
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <article className="mt-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-6">Settings</h1>
      <Profile lang={lang} {...user} handleUpdate={handleUpdate} setMessage={addMessage} />
      <Account lang={lang} {...user} handleUpdate={handleUpdate} />
    </article>
  );
}

const content = {
  h1: { en: "Settings", ar: "إعدادات" },
  done: { en: "Done", ar: "تم" },
};

const fakeAddress = {
  line1: "Govert Flinckstraat",
  line2: "2",
  postalCode: "1072 EE",
  city: "Amsterdam",
  province: "north holland",
  country: "Netherlands",
};
