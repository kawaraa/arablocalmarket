"use client";
import { useContext, useEffect } from "react";
import { AppSessionContext } from "../app-session-context";
import Profile from "./(component)/profile";
import Account from "./(component)/account";
import { useRouter } from "next/navigation";

export default function Settings(props) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Settings - ALM";
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <article className="mt-4 max-w-md mx-auto">
      {/* <h1 className="text-xl mb-6">Settings</h1> */}
      <Profile lang={lang} firstName={"Mr"} lastName={"Tester"} address={fakeAddress} />
      <Account lang={lang} username={"username"} email={"test@example.com"} />
    </article>
  );
}

const content = {};

const fakeAddress = {
  line1: "Govert Flinckstraat",
  line2: "2",
  postalCode: "1072 EE",
  city: "Amsterdam",
  province: "north holland",
  country: "Netherlands",
};
