"use client";
import Avatar from "./(styled)/avatar";
import Dropdown from "./(styled)/dropdown";

export default function NavUserList() {
  return (
    <Dropdown btnContent={<Avatar initial="a" />} wrapperCls="ml-4" cls="!rounded-full">
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
