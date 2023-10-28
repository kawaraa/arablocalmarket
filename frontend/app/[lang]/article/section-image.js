import Image from "next/image";

export default function SectionImage({ data, alt, cls = "" }) {
  if (!data || !data?.attributes) return null;
  return (
    data && (
      <div className={"flex items-center " + cls}>
        <Image src={data.attributes.url} width="1000" height="1000" alt={alt} className="w-full" />
      </div>
    )
  );
}
