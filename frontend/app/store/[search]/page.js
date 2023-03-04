// "use client";
// import { useSelectedLayoutSegment, usePathname } from "next/navigation";

import { cookies } from "next/headers";

export default function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  // console.log(params);
  // console.log(searchParams);

  // Use "lang" to fetch the proper translation from Strapi
  const store = {
    about: "This is just a random",
  };

  return (
    <>
      <h2 className="text-lg mb-3 font-medium">Opening hours</h2>

      <h2 className="text-lg mb-3 font-medium">Rating</h2>

      <br />
      <h2 className="text-lg mb-3 font-medium">Description</h2>

      <p>
        Welcome to our supermarket, where we are committed to providing you with a convenient and enjoyable
        shopping experience. We understand that grocery shopping can be a chore, which is why we have worked
        hard to create a space that is easy to navigate, well-stocked with a wide range of products, and
        staffed by friendly and knowledgeable team members.
        <br />
        <br />
        At our supermarket, you will find everything you need to fill your pantry, fridge, and freezer. Our
        fresh produce section is always stocked with a wide variety of fruits and vegetables, and our meat and
        seafood department offers high-quality products that are perfect for any meal. We also have a wide
        range of dairy products, baked goods, and pantry staples, so you can always find what you need to make
        your favorite recipes.
        <br />
        <br />
        In addition to our grocery products, we also have a pharmacy, where you can fill prescriptions and
        find over-the-counter medications and health products. Our deli and bakery offer a variety of
        fresh-made sandwiches, salads, and baked goods, making it easy to grab a quick and tasty meal while
        you shop.
        <br />
        <br />
        Our supermarket is committed to making shopping as easy and convenient as possible. We offer online
        ordering and delivery services, so you can shop from the comfort of your own home and have your
        groceries delivered straight to your door. Our team members are always available to help you find what
        you need and answer any questions you may have.
        <br />
        <br />
        Thank you for choosing our supermarket for your grocery needs. We look forward to serving you and
        helping you make mealtime a little easier and more enjoyable.
      </p>
    </>
  );
}
