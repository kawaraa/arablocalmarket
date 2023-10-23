export default function SectionImage({ data, alt, cls = "" }) {
  if (!data || !data?.attributes) return null;
  return (
    data && (
      <div className={"flex items-center " + cls}>
        <img src={data.attributes.url} alt={alt} className="w-full" />
      </div>
    )
  );
}
