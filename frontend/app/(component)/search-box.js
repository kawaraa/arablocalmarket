"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import icons from "./(styled)/icons";
import Modal from "./(styled)/modal";
import LeafletMap from "./leaflet-map";

export default function SearchBox({}) {
  const [showForm, setShowForm] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);
  const [position, setPosition] = useState([41.0247, 28.9252]);

  const router = useRouter();
  /*
  - A switch for location Ask for location permission
  - Select for country
  - Select for city based on the selected country.
  - Input for street name

  */

  const askForLocationPermission = (e) => {
    console.log("askForLocationPermission: ", e.target.checked);
    setLocationPermission(!locationPermission);
    // setPosition()
    // updateLocation()

    // Show "Changes has been saved"
  };

  const updateLocation = (location) => {
    console.log("updateLocation: ", location);
    setPosition([location.lat, location.lng]);
    // Show "Changes has been saved"
  };

  useEffect(() => {
    // Todo: check if the location permission is granted take the lat, lng then make the location checkbox checked
  }, []);

  return (
    <>
      <Modal
        title="Select a location"
        okBtn="Save"
        open={showForm}
        onApprove={null}
        onCancel={() => setShowForm(false)}>
        <div>
          <LeafletMap
            coordinates={position}
            onLocate={updateLocation}
            permissionGranted={locationPermission}
            onLocationPermissionAsk={askForLocationPermission}
          />
        </div>
      </Modal>

      <form onSubmit={console.log} className="relative w-full mt-3 mb-5 flex justify-end">
        {/* relative flex md:mr-2 w-6 md:w-7 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc transition */}

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-8 p-1 text-t hover:text-lt transition"
          title="Show search filter"
          aria-label="Search filter"
          aria-expanded={showForm}
          aria-haspopup="dialog">
          {icons.filter}
        </button>

        <label htmlFor="store-search" className="absolute top-1.5 right-2 w-5 text-black ">
          {icons.search}
        </label>
        <input
          type="text"
          name="search"
          autoComplete="search"
          placeholder="Search for a store"
          className="flex-auto p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg focus:outline-none border border-bc hover:border-bf focus:shadow-lg"
          id="store-search"
          tabIndex="0"
        />
      </form>
    </>
  );
}
