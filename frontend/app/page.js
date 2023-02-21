import { headers } from "next/headers";
import Cookies from "./(service)/cookies";
import Button from "./(component)/(styled)/button";
import Dropdown from "./(component)/(styled)/dropdown";
import Select from "./(component)/select";
import SelectList from "./(component)/select-list";
import Switch from "./(component)/switch";
import Breadcrumb from "./(component)/breadcrumb";
import ContextMenu from "./(component)/context-menu";
import Footer from "./(layout)/footer";
import content from "./page.json";
import icons from "./(component)/(styled)/icons";

export default function LandingPage(props) {
  const headersList = headers();
  const { lang, themeMode } = Cookies.parse(headersList.get("cookie"));

  return (
    <div className="">
      <div className="absolute inset-0 h-[100vh] w-full p-g-bg">
        <div className="h-32 flex justify-center mt-24 mx-3 py-5 rounded-xl bg-d-c-bg">
          <img src="/logo-with-letters.svg" />
        </div>

        {/* <h1 className="mb-64">Hello from Home and landing page!</h1> */}

        <section className="relative top-0 px-4 pt-10 w-full ">
          {/* <div className="absolute top-0 left-0 w-full"> */}
          <h1 className="text-4xl md:text-5xl mt-0 mb-8 text-center">
            {content.h1.text[lang]} <span className="sr-only">{content.h1.hidden[lang]}</span>
          </h1>
          <p className="text-xl text-center">{content.h1P[lang]}</p>

          <h2 className="text-2xl mt-10 mb-10 text-center">{content.h2[lang]}</h2>
          <p className="text-md text-center">
            Todo: Turn on the location Or Select your area. list of country where the user can select the
            country, the province, the city, the neighborhood and maybe the street
          </p>
          <p className="text-md text-center">
            Are you a store owner? then please feel free to contact us, we are here to help you grow your
            business
          </p>
        </section>
      </div>
      <div className="mt-[100vh]">
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
        <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
      </div>
      <Footer />
    </div>
  );
}
