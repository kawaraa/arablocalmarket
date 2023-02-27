"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./(styled)/modal";
import LeafletMap from "./leaflet-map";
import SearchBox from "./search-box";

export default function StoreSearch({ coordinates = [0, 0] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  const [position, setPosition] = useState(coordinates);
  const [range, setRange] = useState("0.5");
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    router.push(`${pathname}?search=${search}&lat=${position[0]}&lng=${position[1]}&range=${range}`);
    if (showFilter) setShowFilter(false);
  };

  useEffect(() => {
    setSearch(searchParams.get("search")?.trim() || "");
    setPosition([searchParams.get("lat")?.trim() || 41.0247, searchParams.get("lng")?.trim() || 28.9252]);
  }, [searchParams]);

  return (
    <>
      <SearchBox
        label="Search for a store"
        onSearch={setSearch}
        search={search}
        onShowFilter={setShowFilter}
        onFinish={handleSearch}
      />

      <Modal
        title="Select a location"
        okBtn="Save"
        open={showFilter}
        onApprove={handleSearch}
        onCancel={() => setShowFilter(false)}>
        <div>
          <LeafletMap
            coordinates={position}
            onLocate={({ lat, lng }) => setPosition([lat, lng])}
            requestUserLocation={true}
            onError={() => alert("Could not access your location, please turn your location on.")}
          />
        </div>
      </Modal>
    </>
  );
}
