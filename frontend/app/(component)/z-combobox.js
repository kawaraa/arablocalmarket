"use client";

export default function ComboBox({ a }) {
  console.log("ComboBox: >>>", a);

  return (
    <div className="fixed top-16 w-72">
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            id="headlessui-combobox-input-:R2q:"
            role="combobox"
            type="text"
            aria-expanded="false"
            data-headlessui-state=""
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-2"
            id="headlessui-combobox-button-:R4q:"
            type="button"
            tabindex="-1"
            aria-haspopup="true"
            aria-expanded="false"
            data-headlessui-state="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-gray-400">
              <path
                fill-rule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>

      <ul
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        aria-labelledby="headlessui-combobox-button-:R4q:"
        role="listbox"
        id="headlessui-combobox-options-:r0:"
        data-headlessui-state="open">
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r1:"
          role="option"
          tabindex="-1"
          aria-selected="true"
          data-headlessui-state="selected">
          <span class="block truncate font-medium">Wade Cooper</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"></path>
            </svg>
          </span>
        </li>
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r2:"
          role="option"
          tabindex="-1"
          aria-selected="false"
          data-headlessui-state="">
          <span class="block truncate font-normal">Arlene Mccoy</span>
        </li>
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r3:"
          role="option"
          tabindex="-1"
          aria-selected="false"
          data-headlessui-state="">
          <span class="block truncate font-normal">Devon Webb</span>
        </li>
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r4:"
          role="option"
          tabindex="-1"
          aria-selected="false"
          data-headlessui-state="">
          <span class="block truncate font-normal">Tom Cook</span>
        </li>
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r5:"
          role="option"
          tabindex="-1"
          aria-selected="false"
          data-headlessui-state="">
          <span class="block truncate font-normal">Tanya Fox</span>
        </li>
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
          id="headlessui-combobox-option-:r6:"
          role="option"
          tabindex="-1"
          aria-selected="false"
          data-headlessui-state="">
          <span class="block truncate font-normal">Hellen Schmidt</span>
        </li>
      </ul>
    </div>
  );
}
