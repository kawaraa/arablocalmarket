"use client";

export default function Card({ a }) {
  console.log("Card: >>>", a);

  return (
    <section className="o">
      <div className="w-3/4 m-auto dark:bg-d-c-bg dark:text-d-c rounded-lg px-6 py-8 ring-1 ring-l-h/5 shadow-xl dark:shadow-none">
        <div>
          <span className="inline-flex items-center justify-center p-2 bg-ico-bg rounded-md shadow-lg">
            <svg
              className="h-6 w-6 text-ico-c"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </span>
        </div>
        <h3 className="text-l-h dark:text-d-tc mt-5 text-base font-medium tracking-tight">
          Writes Upside-Down
        </h3>
        <p className="mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works
          in outer space.
        </p>
      </div>
    </section>
  );
}
