"use client";

export default function StoreById(props) {
  console.log("storeId: >>>", props);

  useEffect(() => {
    document.title = "Store Name / title - ALM";
  }, []);

  return (
    <div>
      <h1>Hello from private store by ID page!</h1>
      <p>Here will show the store by ID to the admin Or the store by ID to the employee.</p>
      <p>Show Products tab.</p>
      <p>Show Orders tab.</p>
      <p>If admin, Show Employees tab.</p>
    </div>
  );
}

const content = {};
