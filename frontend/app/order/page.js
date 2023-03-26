"use client";
import { useEffect } from "react";
import BarcodeScanner from "../(component)/barcode-scanner";
// import BarcodeScanner from "../(component)/barcode-scanner";
import OrderCard from "../(component)/order-card";

export default function Orders(props) {
  const orders = [];

  useEffect(() => {
    document.title = "Orders - ALM";
  }, []);

  return (
    <div>
      <h1>Orders!</h1>
      {/* <BarcodeScanner onDetect={console.log} onError={console.log} onClose={console.log} cls="mt-5" /> */}
      <section>
        <h3>Store 1 name</h3>

        {/* <video src="https://www.w3schools.com/html/mov_bbb.mp4" width="400" className="mirror"></video> */}
        <BarcodeScanner
          onDetect={(e) => console.log("Scanner Detected: >>> " + e)}
          onError={(e) => console.log("Scanner Error: >>> " + e)}
          onClose={(e) => console.log("Scanner Close: >>> " + e)}
          cls="mt-5"
        />

        <ul>
          {orders.map((o, i) => (
            <OrderCard {...o} key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}

const content = {};
