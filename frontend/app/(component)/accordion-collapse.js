"use client";

export default function Collapse({ a }) {
  console.log("Collapse: >>>", a);

  return (
    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
      <button
        class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        id="headlessui-disclosure-button-:R6:"
        type="button"
        aria-expanded="false"
        data-headlessui-state="">
        <span>What is your refund policy?</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          class=" h-5 w-5 text-purple-500">
          <path
            fill-rule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="mt-2" data-headlessui-state="">
        <button
          class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          id="headlessui-disclosure-button-:Ra:"
          type="button"
          aria-expanded="false"
          data-headlessui-state="">
          <span>Do you offer technical support?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            class=" h-5 w-5 text-purple-500">
            <path
              fill-rule="evenodd"
              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
