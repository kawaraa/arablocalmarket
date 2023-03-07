"use client";

export default function Employees(props) {
  console.log("Employees: >>>", props);

  useEffect(() => {
    document.title = "Employees - ALM";
  }, []);

  return (
    <div>
      <h1>Employees!</h1>
    </div>
  );
}

const content = {};
