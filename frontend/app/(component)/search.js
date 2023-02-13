"use client";

export default function Search({ a }) {
  console.log("Search: >>>", a);

  return (
    <div class="flex lg:ml-6">
      <div class="col-span-6">
        <label for="search" class="p-2 text-gray-400 hover:text-gray-500">
          <span class="">Search</span>
          {/* <!-- Heroicon name: outline/magnifying-glass --> */}
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
        <input
          type="text"
          name="search"
          id="search"
          autocomplete="search"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}
