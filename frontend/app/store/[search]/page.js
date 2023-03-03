// "use client";
// import { useSelectedLayoutSegment, usePathname } from "next/navigation";

import { cookies } from "next/headers";

export default function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  // console.log(params);
  // console.log(searchParams);

  // const s = useSelectedLayoutSegment();

  // Show different component based on the tab.
  // Possible tabs: overview, category, products

  return (
    <>
      <h2 className="text-lg mb-3 font-medium">Description</h2>

      <p>About: Hello from public store by ID page!, Here will show the store by ID to the public.</p>

      <p>Opening hours</p>

      <p>Rating</p>
    </>
  );
}
