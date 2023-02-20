"use client";
import { useContext, useEffect } from "react";
import { AppSessionContext } from "../app-session-context";

export default function Cart(props) {
  console.log("Cart: >>>", props);

  const { loading, setLoading, lang, updateLang, themeMode, updateThemeMode, user } =
    useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Shipping Cart - ALM";
  }, []);

  return (
    <div>
      <h1>Shipping Cart!</h1>
      <section>
        <h3>Store 1 name</h3>

        <p>Items</p>
        <p>Pickup / Delivery, if delivery show the saved address or fill a new one</p>

        <div>
          <h3>Payment methods!</h3>
          Show the available methods tabs
        </div>

        <button>Checkout</button>
      </section>

      <section>
        <h3>Store 2 name</h3>

        <p>Items</p>
        <p>Pickup / Delivery, if delivery show the saved address or fill a new one</p>

        <div>
          <h3>Payment methods!</h3>
          Show the available methods tabs
        </div>

        <button>Checkout</button>
      </section>
    </div>
  );
}
