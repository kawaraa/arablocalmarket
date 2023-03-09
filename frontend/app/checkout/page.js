"use client";
import Image from "next/image";
import { useState } from "react";
import SvgIcon from "../(component)/(styled)/svg-icon";

export default function Checkout({}) {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  return (
    <article className="pt-10">
      <session className="">
        {/* Todo: if store.deliver then show delivery option. */}
        <div className="flex justify-center items-center space-x-2">
          {[
            { t: "pickup", icon: "personPushingCart" },
            { t: "delivery", icon: "foodDeliverBike" },
          ].map(({ t, icon }, i) => (
            <label
              htmlFor={"pickup" + i}
              className="relative w-1/2 md:w-32 h-32 flex flex-col justify-center items-center space-y-3 rounded-lg card cd_hr"
              key={i}>
              <input
                type="radio"
                name="delivery"
                id={"pickup" + i}
                onChange={() => setDeliveryMethod(t)}
                required
                className="absolute top-0 left-0 w-full h-full appearance-none border-pc2 checked:border-4 rounded-lg"
              />
              <div className="h-1/3 ">
                <SvgIcon name={icon} />
              </div>
              <div className="capitalize">{t}</div>
            </label>
          ))}
        </div>
      </session>

      {deliveryMethod === "delivery" && <p>show the saved address or fill a new one</p>}

      <div>
        <h3>Payment methods!</h3>
        Show the available methods tabs
      </div>

      <button>Checkout</button>
    </article>
  );
}

const content = {
  buyBtn: { en: "Buy", ar: "شراء" },
};
