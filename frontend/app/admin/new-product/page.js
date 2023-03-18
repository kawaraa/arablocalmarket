"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";

export default function Admin({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Admin new product - ALM";
  }, []);

  return (
    <article>
      <h1 className="mx-2 my-3">{content.h1[lang]}</h1>
    </article>
  );
}

const content = {
  h1: { en: "Create product", ar: "إنشاء منتج" },
};
