"use client";
import { useContext, useEffect } from "react";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";

export default function PaymentSuccess({ params, searchParams }) {
  const { user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const success = params.status != "success";

  const updateStorSubscriptionStatus = async (storeId) => {
    setAppLoading(true);
    try {
      await request("store", "PATCH", { query: `/${storeId}` });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    updateStorSubscriptionStatus(searchParams.storeId);
  }, []);

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
  }, [user]);

  if (!user || user?.loading) return null;
  return (
    <div>
      <h1 className="text-2xl center">{success ? "Success" : "Failed"}</h1>
    </div>
  );
}
