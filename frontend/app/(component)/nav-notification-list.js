"use client";
import icons from "./(styled)/icons";

export default function NavNotificationList() {
  return (
    <div className="relative">
      <button
        type="button"
        className="transition mx-2 w-6 rounded-full text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
        <span className="sr-only">View notifications</span>
        {icons.bell}
      </button>
    </div>
  );
}
