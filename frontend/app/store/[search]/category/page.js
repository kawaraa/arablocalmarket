import { cookies } from "next/headers";

export default function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <section className="mt-6 pb-6 border-b-2 border-bc">
      <h2 className="text-lg mb-3 font-medium">Category</h2>

      <p>Category 1</p>

      <p>Category 2</p>

      <p>Category 2</p>
    </section>
  );
  /* <Tabs tabs={tabs.map((key, path, text) => ({ key, path, text: text[lang] }))} /> */
}
