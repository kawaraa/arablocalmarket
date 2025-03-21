"use client";
import { useEffect, useState } from "react";
import { countries } from "k-utilities";
import { InputField } from "./(styled)/inputs";
import LeafletMap from "./leaflet-map";

export default function AddressInputs({ lang, checkout, map, onError, ...adr }) {
  const [country, setCountry] = useState();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleUpdate = (lat, lng, adrName) => {
    if (lat) setLat(lat);
    if (lng) setLng(lng);
    if (adrName) {
      setLine1(adrName?.split(",")[0] || "");
      if (checkout) return;
      const cy = Object.keys(countries).find((cy) => adrName?.includes(cy));
      if (cy) {
        setCountry(cy);
        const py = Object.keys(countries[cy].provinces).find((p) => adrName?.includes(p));
        if (py) {
          setProvince(py);
          const city = Object.keys(countries[cy].provinces[py]).find((c) => adrName?.includes(c));
          if (city) setCity(city);
        }
      }
    }
  };

  useEffect(() => {
    if (adr.country && !country) setCountry(adr.country || "netherlands");
    if (adr.province) setProvince(adr.province);
    if (adr.city) setCity(adr.city);
    if (adr.postalCode) setPostalCode(adr.postalCode);
    if (adr.line1) setLine1(adr.line1);
    if (adr.line2) setLine2(adr.line2);
    if (adr.currentLat && !lat) setLat(adr.currentLat);
    if (adr.currentLng && !lng) setLng(adr.currentLng);
  }, [adr.country]);

  const renderCountries = () => {
    const options = [];
    for (const c in countries) {
      options.push(
        <option value={c} key={countries[c].code}>
          {c}
        </option>
      );
    }
    return options;
  };

  const renderProvinces = () => {
    const options = [];
    if (!countries[country]) return options;
    for (const p in countries[country].provinces) {
      options.push(
        <option value={p} key={p}>
          {p}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="space-y-3">
      {map && (
        <>
          <LeafletMap
            lang={lang}
            coordinates={[lat, lng]}
            onLocate={({ lat, lng, display_name }) =>
              handleUpdate(lat, lng, display_name?.toLowerCase() || "")
            }
            requestUserLocation={true}
            onError={onError}
          />
          <input type="hidden" name="lat" value={lat} />
          <input type="hidden" name="lng" value={lng} />
        </>
      )}

      <div className="flex">
        <select
          name="country"
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
          required
          disabled={checkout}
          // autoComplete="country"
          className={`block bg-cbg w-1/2 px-3 card ${checkout ? "" : "cd_hr"} fs rounded-${
            lang == "en" ? "l-md py-2" : "r-md py-0"
          }`}>
          <option value="">{content.country[lang]}</option>
          {renderCountries()}
        </select>

        <select
          name="province"
          value={province || ""}
          onChange={(e) => setProvince(e.target.value)}
          required
          disabled={checkout}
          // autoComplete="country-name"
          className={`block bg-cbg w-1/2 px-3 card ${checkout ? "" : "cd_hr"} fs rounded-${
            lang == "en" ? "r-md py-2" : "l-md py-0"
          }`}>
          <option value="">{content.province[lang]}</option>
          {renderProvinces()}
        </select>
      </div>
      <div className="flex">
        <select
          name="city"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={checkout}
          title={content.city[lang]}
          aria-label={content.city[lang]}
          // autoComplete="address-level2"
          className={`block bg-cbg w-1/2 px-1 card ${checkout ? "" : "cd_hr"} fs rounded-${
            lang == "en" ? "l-md py-2" : "r-md py-0"
          }`}>
          <option value="">{content.city[lang]}</option>
          {countries[country]?.provinces[province]?.map((city, i) => (
            <option value={city} key={i}>
              {city}
            </option>
          ))}
        </select>

        <InputField
          type="text"
          name="postalCode"
          // required
          min="4"
          max="10"
          value={postalCode || ""}
          onChange={(e) => setPostalCode(e.target.value)}
          autoComplete="postal-code"
          placeholder={content.postalCode[lang]}
          title={content.postalCode[lang]}
          full
          cls="relative w-1/2 "
          inCls={`rounded-${lang == "en" ? "r-md py-[7px]" : "l-md py-1"}`}
        />
      </div>
      <InputField
        type="text"
        name="line1"
        required
        min="2"
        max="150"
        value={line1 || ""}
        onChange={(e) => setLine1(e.target.value)}
        autoComplete="address-line1"
        placeholder={content.line1[lang]}
        title={content.line1[lang]}
        full
        cls="relative shadow-sm"
      />
      <InputField
        type="text"
        name="line2"
        min="0"
        max="150"
        value={line2 || ""}
        onChange={(e) => setLine2(e.target.value)}
        autoComplete="address-line2"
        placeholder={content.line2[lang]}
        title={content.line2[lang]}
        full
        cls="relative shadow-sm"
      />
    </div>
  );
}

const content = {
  country: { en: "Select country", ar: "البلد" },
  province: { en: "Select province", ar: "المقاطعة" },
  city: { en: "Select city", ar: "المدينة" },
  postalCode: { en: "Postal Code", ar: "الرمز البريدي" },
  line1: { en: "Street", ar: "الشارع" },
  line2: { en: "Addition (Optional)", ar: "الإضافة (اختياري)" },
};
