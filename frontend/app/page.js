import Button from "./(component)/button";
import Dropdown from "./(component)/dropdown";
import Modal from "./(component)/modal";
import Select from "./(component)/select";
import SelectList from "./(component)/select-list";
import Cart from "./(component)/cart";
import Switch from "./(component)/switch";
import Tooltip from "./(component)/tooltip";
import Breadcrumb from "./(component)/breadcrumb";

export default function LandingPage() {
  return (
    <div>
      <h1 className="mb-64">Hello from Home and landing page!</h1>
      {/* 
      <Dropdown />
      <SelectList />
      <Select />
      <Modal />
      <Cart />
      <Switch />
    */}

      {/* <div className="w-3/4 m-auto dark:bg-d-c-bg dark:text-d-c rounded-lg px-6 py-8 ring-1 ring-l-h/5 shadow-xl dark:shadow-none">
        <div>
          <span className="inline-flex items-center justify-center p-2 bg-ico-bg rounded-md shadow-lg">
            <svg
              className="h-6 w-6 text-ico-c"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </span>
        </div>
        <h3 className="text-l-h dark:text-d-tc mt-5 text-base font-medium tracking-tight">
          Writes Upside-Down
        </h3>
        <p className="mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works
          in outer space.
        </p>
      </div> */}

      {/* <div class="flex -space-x-1 overflow-hidden">
        <img
          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <img
          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div> */}

      {/* <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p>
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
      <p>fhfnbwog gwgiw wgiowg gwgwgw gwgiwwg wg w3gw gwgiweg weg wegw gh wrapperfwe g wrh</p> */}
    </div>
  );
}
