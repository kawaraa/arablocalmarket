"use client";

export default function Login({ a }) {
  console.log("Login: >>>", a);

  return (
    <div>
      <form>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700">Email</span>
          <input type="email" class="peer ..." />
          <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>
      </form>
    </div>
  );
}
