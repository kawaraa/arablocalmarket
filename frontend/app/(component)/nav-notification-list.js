"use client";
import Dropdown from "./(styled)/dropdown";
import icons from "./(styled)/icons";

export default function NavNotificationList() {
  return (
    <Dropdown icon="bell" wrapperCls="mx-2" cls="!rounded-full" label="View notifications">
      <li>Option</li>

      <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-0">
        Your Profile
      </a>
      <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-1">
        Settings
      </a>
      <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-2">
        Sign out
      </a>
    </Dropdown>
  );
}
