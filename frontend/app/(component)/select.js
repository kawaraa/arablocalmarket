"use client";

export default function Select({ a }) {
  console.log("Select: >>>", a);

  return (
    <div class="absolute inset-y-0 right-0 flex items-center">
      <label for="currency" class="sr-only">
        Currency
      </label>
      <select
        id="currency"
        name="currency"
        class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option>USD</option>
        <option>CAD</option>
        <option>EUR</option>
      </select>
    </div>
  );
}
