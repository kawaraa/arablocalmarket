"use client";
import { useState } from "react";

export default function Login({ a }) {
  return (
    <div>
      <form>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Email</span>

          <input type="email" className="peer ..." />
          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>
      </form>
    </div>
  );
}
