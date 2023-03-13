"use client";
import { useEffect, useState } from "react";
import {
  EmailInputField,
  InputField,
  PhoneInputField,
  PswInputField,
} from "../../(component)/(styled)/inputs";

export default function Profile({ lang, username, email, phone }) {
  const [urName, setUrName] = useState(username);
  const [eml, setEml] = useState(email);
  const [phn, setPhn] = useState(phone);
  const [loading, setLoading] = useState(false);

  const updateUsername = (e) => {
    console.log(e.target.value);
    setUrName(e.target.value);
  };

  const updateEmail = (e) => {
    console.log(e.target.value);
    setEml(e.target.value);
  };

  const updatePhone = (e) => {
    console.log(e.target.value);
    setEml(e.target.value);
  };

  const updatePassword = (e) => {
    console.log(e.target.value);
    setEml(e.target.value);
  };

  useEffect(() => {
    document.title = "Settings - ALM";
  }, []);

  return (
    <section>
      <h3 className="text-lg font-medium mb-2 mt-6">Account</h3>
      <InputField
        editable
        type="text"
        name="username"
        required
        min="4"
        max="15"
        defaultValue={urName}
        onBlur={updateUsername}
        cls="mb-2"
      />

      <EmailInputField editable defaultValue={eml} onBlur={updateEmail} cls="mb-2" />
      <PhoneInputField editable defaultValue={phn} onBlur={updatePhone} cls="mb-2" />

      {/* <div>
        Phone number : visible
        <input type="checkbox" />
      </div> */}

      <PswInputField editable placeholder="********" onBlur={updatePassword} cls="mb-2" />

      {/* <div>2AF Switch button</div> */}
    </section>
  );
}

const content = {};
