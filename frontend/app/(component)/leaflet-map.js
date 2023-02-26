import { useEffect, useState } from "react";
import Script from "next/script";
import icons from "./(styled)/icons";

export default function Map({ coordinates, onLocate, permissionGranted, onLocationPermissionAsk }) {
  const [search, setSearch] = useState("");

  const handleAddressSearch = async (e) => {
    e.preventDefault();
    if (!search) throw new Error("Please enter a location.");

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=jsonv2`;
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
  };

  const initializeMap = (Map) => {
    const OpenStreetMapTileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = "&copy; OpenStreetMap contributors";

    if ((Map && !Map.newMap) || !Map.newMap._mapPane) {
      Map.newMap = Map.map("map").setView(coordinates, 13);
    }

    // Add the base map tiles (OpenStreetMap)
    L.tileLayer(OpenStreetMapTileUrl, { attribution }).addTo(Map.newMap);

    // Add a marker to the map at the user's selected location
    Map.newMap.marker = L.marker([41.0247, 28.9252]).addTo(Map.newMap);

    Map.newMap.on("click", (e) => {
      onLocate({ lat: (+e.latlng.lat).toFixed(6), lng: (+e.latlng.lng).toFixed(6) });
    });

    document?.querySelector(".leaflet-control-attribution.leaflet-control")?.remove();
  };

  useEffect(() => {
    if (window.L?.newMap?.marker && coordinates) {
      window.L.newMap.marker.setLatLng([coordinates[0], coordinates[1]]);
    }
  }, [coordinates]);

  useEffect(() => {
    if (window.L) {
      initializeMap(window.L);
      return () => window.L.newMap.remove();
    }
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/leaflet/dist/leaflet.js" onLoad={() => initializeMap(window.L)}></Script>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

      <form onSubmit={handleAddressSearch} className="relative">
        <input type="text" name="address" value={search} onChange={(e) => setSearch(e.target.value.trim())} />
        <button type="submit">Search</button>

        <div id="map" className="w-full h-64 rounded-lg"></div>

        <div className="absolute bottom-8 right-4 w-8 py-[3px] text-t hover:text-lt bg-bg dark:bg-dbg rounded-full shadow-md transition">
          <input
            type="checkbox"
            checked={permissionGranted}
            onChange={onLocationPermissionAsk}
            id="my-location"
            className="peer absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
          />
          <label htmlFor="my-location" className="peer-checked:text-green cursor-pointer">
            {icons.location}
          </label>
        </div>
      </form>
    </>
  );
}
