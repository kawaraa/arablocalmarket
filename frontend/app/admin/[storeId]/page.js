"use client";

// import NewStore from "../create-store/page";
export default function StoreById({ params, searchParams }) {
  console.log("Vew and update store by ID: >>>", params, searchParams);

  useEffect(() => {
    document.title = "Store Name / title - ALM";
  }, []);

  return (
    <div>
      {/* <NewStore /> */}
      {/* And pass "edit option" component if possible */}
      <h1>Hello from private store by ID page!</h1>
      <p>Here will show the store by ID to the admin Or the store by ID to the employee.</p>
      <p>Show Products tab.</p>
      <p>Show Orders tab.</p>
      <p>If admin, Show Employees tab.</p>
    </div>
  );
}

const content = {};
