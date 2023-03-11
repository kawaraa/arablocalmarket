"use client";
import { useState } from "react";
import { countries } from "k-utilities";
import { InputField } from "./(styled)/inputs";

// Todo: render addresses, and add / update
export function AddressInputs({ lang, line1, line2, city, postalCode, province, country }) {
  const [l1, setL1] = useState(line1 || "");
  const [l2, setL2] = useState(line2 || "");
  const [c, setC] = useState(city || "");
  const [pC, setPC] = useState(postalCode || "");
  const [p, setP] = useState(province || "north holland");
  const [cy, setCy] = useState(country || "netherlands");

  const allCountries = Object.keys(countries);
  // const allProvinces = Object.keys(countries[cy].provinces);
  // const allCities = countries[cy].provinces[p];
  // console.log(allCountries);
  // console.log(allProvinces);
  // console.log(allCities);

  return (
    <div className="w-full max-w-md mx-auto mt-6 space-y-3">
      <div className="flex">
        <select
          required
          autoComplete="country"
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-l-md">
          <option selected>{content.country[lang]}</option>
          {allCountries.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>

        <select
          required
          autoComplete="country-name"
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-r-md">
          <option selected>{content.province[lang]}</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className="flex">
        <select
          required
          title={content.city[lang]}
          aria-label={content.city[lang]}
          autoComplete="address-level2"
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-l-md">
          <option selected>{content.city[lang]}</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>

        <InputField
          type="text"
          name="postalCode"
          required
          autoComplete="postal-code"
          placeholder={content.postalCode[lang]}
          title={content.postalCode[lang]}
          min="4"
          max="10"
          cls="relative w-1/2 "
          inCls="rounded-r-md"
        />
      </div>
      <InputField
        type="text"
        name="line1"
        required
        autoComplete="address-line1"
        placeholder={content.line1[lang]}
        title={content.line1[lang]}
        min="2"
        max="150"
        cls="relative shadow-sm"
      />
      <InputField
        type="text"
        name="line2"
        required
        autoComplete="address-line2"
        placeholder={content.line2[lang]}
        title={content.line2[lang]}
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
