"use client";
import { useEffect } from "react";

export default function Settings(props) {
  console.log("Settings: >>>", props);

  useEffect(() => {
    document.title = "Settings - ALM";
  }, []);

  return (
    <article className="mt-10">
      <h1 className="text-xl">Settings!</h1>
      <section>
        <h3>Profile section!</h3>

        <div>First name</div>
        <div>Last name</div>
      </section>

      <section>
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
      </section>
    </article>
  );
}

const content = {};
