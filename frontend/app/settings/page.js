"use client";

export default function Settings(props) {
  console.log("Settings: >>>", props);

  useEffect(() => {
    document.title = "Settings - ALM";
  }, []);

  return (
    <div>
      <h1>Settings!</h1>
      <div>
        <h3>Profile section!</h3>

        <p>First name</p>
        <p>Last name</p>
      </div>

      <div>
        <h3>Account section!</h3>

        <p>
          Phone number : visible
          <input type="checkbox" />
        </p>
        <p>
          Email <input type="checkbox" />
        </p>
        <p>Password</p>
        <p>2AF</p>
      </div>
    </div>
  );
}
