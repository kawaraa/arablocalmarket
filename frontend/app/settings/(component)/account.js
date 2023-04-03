"use client";
import { useEffect, useState } from "react";
import { InputField } from "../../(component)/(styled)/inputs";
import { EmailInputField, PhoneInputField, PswInputField } from "../../(component)/custom-inputs";

export default function Account({ lang, username, email, phone, handleUpdate }) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2 mt-6">Account</h3>
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
        cls="mb-2"
      />

      <EmailInputField
        editable
        full
        defaultValue={email || ""}
        onBlur={(e) => handleUpdate({ email: e.target.value })}
        cls="mb-2 13"
      />

      <PhoneInputField
        editable
        full
        defaultValue={phone || ""}
        onBlur={(e) => handleUpdate({ phone: e.target.value })}
        cls="mb-2 242"
      />

      {/* <div>
        Phone number : visible
        <input type="checkbox" />
      </div> */}

      <PswInputField
        editable
        full
        placeholder="********"
        onBlur={(e) => handleUpdate({ password: e.target.value })}
        cls="mb-2 656"
      />

      {/* <div>2AF Switch button</div> */}
    </section>
  );
}

const content = {};
