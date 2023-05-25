import { cookies } from "next/headers";

export default function Contact({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  console.log("Contact: >>>");

  return (
    <div>
      <h1>Contact</h1>
      <div>
        <p>Technical issue</p>
        <p>Suggest new feature</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  return {
    // title: content.title[lang] + " - ALM",
    // description: content.desc[lang],
  };
}

const content = {};
