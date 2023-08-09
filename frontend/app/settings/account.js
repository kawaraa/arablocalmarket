"use client";
import { useState } from "react";
import shdCnt from "../(layout)/json/shared-content.json";
import { InputField } from "../(component)/(styled)/inputs";
import { PhoneInputField, PswInputField } from "../(component)/custom-inputs";
import { Button } from "../(component)/(styled)/button";
import Modal from "../(component)/(styled)/modal";

export default function Account({ lang, username, email, phone, handleUpdate }) {
  const [passwordForm, setPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    await handleUpdate(data);
    setPasswordForm(false);
    setLoading(false);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2 mt-6">{content.h[lang]}</h3>
      <InputField
        editable
        full
        type="text"
        name="username"
        required
        min="4"
        max="15"
        defaultValue={username || ""}
        onBlur={(e) => handleUpdate({ username: e.target.value })}
        cls="mb-5"
      />

      <div dir="auto" className="mb-5 flex justify-between items-center px-2 opacity-60">
        {email}
      </div>

      <PhoneInputField
        lang={lang}
        editable
        full
        defaultValue={phone || ""}
        onBlur={(e) => handleUpdate({ phone: e.target.value })}
        cls="mb-6 242"
      />

      {/* <div>
        Phone number : visible
        <input type="checkbox" />
      </div> */}

      <div dir="ltr" className="mb-5 flex justify-between items-center">
        <span className=" px-2 opacity-60">********</span>
        <Button type="submit" onClick={() => setPasswordForm(true)} cls="!px-2 !py-1 text-sm">
          {shdCnt.edit[lang]}
        </Button>
      </div>

      <Modal
        lang={lang}
        tag="form"
        title="Update Password"
        okBtn="Save"
        onCancel={() => setPasswordForm(false)}
        onSubmit={handleSubmit}
        onApprove={() => {}}
        loading={loading}
        open={passwordForm}>
        <div className="m-1">
          <PswInputField lang={lang} full name="currentPassword" cls="mb-2 11" />
          <PswInputField lang={lang} full newPsw name="password" cls="mb-2 22" />
          <PswInputField lang={lang} full confirm name="passwordConfirmation" cls="mb-2 33" />
        </div>
      </Modal>

      {/* <div>2AF Switch button</div> */}
    </section>
  );
}

const content = {
  h: { en: "Account", ar: "الحساب" },
};
