import Image from "next/image";
import Link from "next/link";

export default function Store() {
  const distance = "1.5 KM";
  return (
    <Link href="store/1">
      <Image src="/kwa-frontend.png" width="200" height="200" alt="Some description for the image" />
      <h1>Store name!</h1>
      <p>{distance}</p>
    </Link>
  );
}
