import { useEffect, useState } from "react";
import Script from "next/script";
import SvgIcon from "./(styled)/svg-icon";
import SearchBox from "./(styled)/search-box";
import Loader from "../(layout)/loader";

export default function Map({ coordinates, onLocate, requestUserLocation, onError }) {
  const [search, setSearch] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [requestingLocation, setRequestingLocation] = useState(false);

  const handleAddressSearch = async () => {
    const q = search.trim();

    try {
      if (!q) throw new Error("Please enter a location.");
      setRequestingLocation(true);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("No results found.");

      const data = await response.json();
      if (data.length === 0) throw new Error("No results found.");

      const address = data[0];

      window.L.newMap.marker.setLatLng([address.lat, address.lon]);
      window.L.newMap.setView([address.lat, address.lon], 13);
      address.lat = (+address.lat).toFixed(6);
      address.lng = (+address.lon).toFixed(6);
      onLocate(address);
    } catch (error) {
      alert("Error: " + error.message);
    }

    setRequestingLocation(false);
  };

  const initializeMap = (Map) => {
    const OpenStreetMapTileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = "&copy; OpenStreetMap contributors";

    if ((Map && !Map.newMap) || !Map.newMap._mapPane) {
      Map.newMap = Map.map("map").setView(coordinates, 6);
    }

    // Add the base map tiles (OpenStreetMap)
    L.tileLayer(OpenStreetMapTileUrl, { attribution }).addTo(Map.newMap);

    // Add a marker to the map at the user's selected location
    Map.newMap.marker = L.marker(coordinates).addTo(Map.newMap);

    Map.newMap.on("click", (e) => {
      onLocate({ lat: (+e.latlng.lat).toFixed(6), lng: (+e.latlng.lng).toFixed(6) });
    });

    onLocationPermissionAsk();
  };

  const onLocationPermissionAsk = () => {
    if (window.L.newMap && requestUserLocation) {
      setRequestingLocation(true);

      window.L.newMap.addEventListener("locationfound", (e) => {
        console.log("locationfound: ", e);
        onLocate({ lat: (+e.latlng.lat).toFixed(6), lng: (+e.latlng.lng).toFixed(6) });
        setPermissionGranted(true);
        setRequestingLocation(false);
      });

      window.L.newMap.addEventListener("locationerror", (e) => {
        if (onError) onError();
        setPermissionGranted(false);
        setRequestingLocation(false);
      });

      window.L.newMap.locate({ enableHighAccuracy: true });
    }
  };

  useEffect(() => {
    if (window.L?.newMap?.marker && coordinates) {
      window.L.newMap.setView([coordinates[0], coordinates[1]], 13);
      window.L.newMap.marker.setLatLng([coordinates[0], coordinates[1]]);
    }
  }, [coordinates]);

  useEffect(() => {
    if (window.L) {
      initializeMap(window.L);

      return () => {
        window.L.newMap.remove();
        delete window.L.newMap;
      };
    }
  }, []);

  return (
    <div className="relative">
      <Script src="https://unpkg.com/leaflet/dist/leaflet.js" onLoad={() => initializeMap(window.L)}></Script>
      <link rel="stylesheet" href="/leaflet/leaflet.css" />

      <SearchBox
        label="Search for a location"
        onSearch={setSearch}
        search={search}
        onFinish={handleAddressSearch}
      />

      <div className="relative overflow-hidden rounded-lg">
        <div id="map" className="w-full h-64 rounded-lg"></div>

        {requestUserLocation && (
          <div className="z-9 absolute bottom-8 right-4 w-8 py-[3px] text-t hover:text-lt bg-bg dark:bg-dbg rounded-full shadow-md transition">
            <input
              type="checkbox"
              checked={permissionGranted}
              onChange={onLocationPermissionAsk}
              id="my-location"
              className="peer absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            />
            <label htmlFor="my-location" className="peer-checked:text-green cursor-pointer ">
              <SvgIcon name="location" />
            </label>
          </div>
        )}

        {requestingLocation && (
          <Loader size="40" wrapperCls="z-9 absolute inset-0 !m-0 bg-blur" cls="text-dt" />
        )}
      </div>
    </div>
  );
}
