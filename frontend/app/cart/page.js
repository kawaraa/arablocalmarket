"use client";

export default function Cart(props) {
  console.log("Cart: >>>", props);

  useEffect(() => {
    document.title = "Shipping Cart - ALM";
  }, []);

  return (
    <div>
      <h1>Shipping Cart!</h1>
      <p>Items</p>
      <p>Pickup / Delivery, if delivery show the saved address or fill a new one</p>

      <div>
        <h3>Payment methods!</h3>
        Show the available methods tabs
      </div>

      <button>Checkout</button>
    </div>
  );
}
