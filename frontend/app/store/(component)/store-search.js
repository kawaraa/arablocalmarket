"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
import Modal from "../../(component)/(styled)/modal";
import LeafletMap from "../../(component)/leaflet-map";
import SearchBox from "../../(component)/(styled)/search-box";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import shdCnt from "../../(layout)/json/shared-content.json";

export default function StoreSearch({ text, userLocation = [0, 0] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, coordinates, range, updateCoordinates, updateRange, addMessage } =
    useContext(AppSessionContext);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState(text || "");

  const handleSearch = () => {
    if (showFilter) setShowFilter(false);
    router.push(`${pathname}?search=${search}`);
  };

  const handleUpdatePosition = ({ lat, lng }) => {
    updateCoordinates([lat, lng]);
  };

  useEffect(() => {
    if (!search.trim() || search.length > 3) handleSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const setFilter = (arg) => setTimeout(() => setShowFilter(arg), 500);

    if (!coordinates[0]) setFilter(true);
    else if (coordinates[0] && userLocation[0] == 0) window.location.reload();
    else setFilter(false);
  }, [coordinates, userLocation]);

  useEffect(() => {
    window.document.title = content.title[lang] + " - ALM";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex my-3">
        <button
          type="button"
          onClick={() => setShowFilter(true)}
          title="Show search filter"
          aria-label="Search filter"
          aria-expanded="true"
          aria-haspopup="dialog"
          className="w-8 p-1 hover:text-pc transition">
          <SvgIcon name="filter" />
        </button>

        <SearchBox
          label={content.searchLabel[lang]}
          onSearch={setSearch}
          search={search}
          onFinish={handleSearch}
          cls="flex-1 sm:flex-none"
        />
      </div>

      <Modal
        lang={lang}
        title={content.modalTitle[lang]}
        okBtn={shdCnt.save[lang]}
        open={showFilter}
        onApprove={handleSearch}
        onCancel={() => setShowFilter(false)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="pointer-events-none w-full"
            fill="none"
            aria-hidden="true">
            <path
              d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        }>
        <div className="text-left m-1">
          <LeafletMap
            lang={lang}
            coordinates={coordinates}
            onLocate={handleUpdatePosition}
            requestUserLocation={true}
            onError={(text) => addMessage({ type: "error", text, duration: 5 })}
          />

          <label
            htmlFor="default-range"
            dir="auto"
            className="block mt-5 mb-1 text-sm text-t font-medium dark:text-dt">
            {content.range[lang][0]}: {range} {content.range[lang][1]}
          </label>
          <input
            id="default-range"
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={range}
            onChange={(e) => updateRange(e.target.value)}
            className="w-full h-1 md:h-2 bg-bc rounded-lg appearance-none cursor-pointer dark:bg-t"
          />
        </div>
      </Modal>
    </>
  );
}

const content = {
  title: { en: "Stores Nearby", ar: "المتاجر المجاورة" },
  searchLabel: { en: "Search for a store", ar: "ابحث عن متجر" },
  modalTitle: { en: "Select a location", ar: "اختر موقعا" },
  range: { en: ["Location range", "KM"], ar: ["نطاق الموقع", "كم"] },
};
