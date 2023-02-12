"use client";

export default function Dashboard(props) {
  console.log("Dashboard: >>>", props);

  useEffect(() => {
    document.title = "Dashboard - ALM";
  }, []);

  return (
    <div>
      <h1>Dashboard!</h1>
      <p>Widgets</p>
      <p>Statistics</p>
    </div>
  );
}
