"use client";
import { useState } from "react";

export default function AuthCallback({ params, searchParams }) {
  const [data, setData] = useState(false);

  console.log("props: >>> ", params, searchParams);

  return <>Redirecting...</>;
}
