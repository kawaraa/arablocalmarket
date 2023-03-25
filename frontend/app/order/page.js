"use client";
import { useEffect, useState } from "react";
import CustomBarcodeDetecter from "../(component)/barcode-detecter";
import BarcodeScanner from "../(component)/barcode-scanner";
// import OrderCard from "../(component)/order-card";

export default function Orders(props) {
  const [text, setText] = useState("");
  // console.log("Orders: >>>", props);
  const orders = [{ items: ["a", "b"] }];

  // useEffect(() => {
  //   document.title = "Orders - ALM";
  // }, []);

  // Todo: Use the search query to read the order ID.
  const orderId = "";

  return (
    <div>
      <h1>Orders! {text}</h1>
      {/* <CustomBarcodeDetecter onDetect={(e) => console.log("Detected: >>> ", e)} /> */}
      <BarcodeScanner
        onDetect={(e) => setText("Detected: >>> " + e)}
        onError={(e) => setText("Detected: >>> " + e)}
      />
      <section>
        <h3>Store 1 name</h3>
        {/* <ul>
          {orders.map((o, i) => (
            <OrderCard {...o} key={i} />
          ))}
        </ul> */}
      </section>
    </div>
  );
}

const content = {};
