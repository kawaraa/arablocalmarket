"use client";

export default function Customer(props) {
  console.log("Profile: >>>", props);

  // This should be an Avatar or User Icon where the user can click on and see a popup with all the details
  return (
    <div>
      <h1>Profile!</h1>

      <p>First name</p>
      <p>Last name</p>

      <p>Number of orders</p>
      <p>Rating</p>
    </div>
  );
}
