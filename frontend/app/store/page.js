import Store from "./store";

export const metadata = { title: "Stores Nearby - ALM" };

export default function StoresNearby() {
  return (
    <div>
      <h1>Hello from stores nearby page!</h1>
      <p>Here show all the stores that near you.</p>
      <Store />
    </div>
  );
}
