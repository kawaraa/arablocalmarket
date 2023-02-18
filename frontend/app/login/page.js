"use client";
import { useState } from "react";
import Modal from "../(component)/modal";
export default function Login({ a }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal
        title="Deactivate account"
        open={open}
        onCancel={() => setOpen(false)}
        onApprove={() => setOpen(false)}>
        <p className="text-md ">
          Todo: Turn on the location Or Select your area. list of country where the user can select the
          country, the province, the city, the neighborhood and maybe the street
        </p>
      </Modal>
      <form>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700" onClick={() => setOpen(true)}>
            Email
          </span>
          <input type="email" className="peer ..." />
          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>
      </form>
    </div>
  );
}
