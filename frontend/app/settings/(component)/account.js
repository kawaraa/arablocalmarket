"use client";
import { useEffect, useState } from "react";
import { InputField } from "../../(component)/(styled)/inputs";

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
        defaultValue={urName}
        onBlur={updateUsername}
        cls="mb-2"
      />
      <InputField
        editable
        type="email"
        name="email"
        title="Email address"
        defaultValue={eml}
        onBlur={updateEmail}
        cls="mb-2"
        inCls="pr-12 rounded-md"
      />
      <InputField
        editable
        type="tel"
        name="phone"
        title="Phone number"
        defaultValue={phn}
        onBlur={updatePhone}
        cls="mb-2"
        inCls="pr-12 rounded-md"
      />

      {/* <div>
        Phone number : visible
        <input type="checkbox" />
      </div> */}

      <InputField
        editable
        type="password"
        name="password"
        placeholder="********"
        onBlur={updatePassword}
        inCls="pr-12 rounded-md"
      />

      {/* <div>2AF Switch button</div> */}
    </section>
  );
}

const content = {};
