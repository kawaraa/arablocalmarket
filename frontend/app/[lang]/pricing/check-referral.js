"use client";
import { useEffect } from "react";
import { Cookies } from "../../(service)/utilities";

export default function CheckReferral({ referralId }) {
  useEffect(() => {
    if (referralId) Cookies.set("referralId", referralId, 7);
  }, [referralId]);

  return null;
}
