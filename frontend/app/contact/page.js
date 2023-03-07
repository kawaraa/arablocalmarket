"use client";

export default function Dashboard(props) {
  console.log("Dashboard: >>>", props);

  useEffect(() => {
    document.title = "Dashboard - ALM";
  }, []);

  return (
    <div>
      <h1>Dashboard!</h1>
      <div>
        <p>Technical issue</p>
        <p>Suggest new feature</p>
      </div>
    </div>
  );
}

const content = {};
