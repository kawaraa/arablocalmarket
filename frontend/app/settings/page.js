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

        <div>First name</div>
        <div>Last name</div>
      </div>

      <div>
        <h3>Account section!</h3>

        <div>
          Phone number : visible
          <input type="checkbox" />
        </div>
        <div>
          Email <input type="checkbox" />
        </div>
        <div>Password</div>
        <div>2AF</div>
      </div>
    </div>
  );
}

const content = {};
