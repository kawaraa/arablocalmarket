"use client";
import { useState } from "react";
import { countries } from "k-utilities";
import { InputField } from "./(styled)/inputs";

export function AddressInputs({ lang, line1, line2, city, postalCode, province = "", country = "" }) {
  const [p, setP] = useState(province || "");
  const [cy, setCy] = useState(country || "");

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
    if (!countries[cy]) return options;
    for (const p in countries[cy].provinces) {
      options.push(
        <option value={p} key={p}>
          {p}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-3 space-y-3">
      <div className="flex">
        <select
          name="country"
          onChange={(e) => setCy(e.target.value)}
          defaultValue={cy}
          required
          // autoComplete="country"
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-l-md">
          <option value="">{content.country[lang]}</option>
          {renderCountries()}
        </select>

        <select
          name="province"
          onChange={(e) => setP(e.target.value)}
          required
          // autoComplete="country-name"
          defaultValue={p}
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-r-md">
          <option value="">{content.province[lang]}</option>
          {renderProvinces()}
        </select>
      </div>
      <div className="flex">
        <select
          name="city"
          required
          defaultValue={city}
          title={content.city[lang]}
          aria-label={content.city[lang]}
          // autoComplete="address-level2"
          className="block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-l-md">
          <option value="">{content.city[lang]}</option>
          {countries[cy]?.provinces[p]?.map((city, i) => (
            <option value={city} key={i}>
              {city}
            </option>
          ))}
        </select>

        <InputField
          type="text"
          name="postalCode"
          required
          min="4"
          max="10"
          defaultValue={postalCode}
          autoComplete="postal-code"
          placeholder={content.postalCode[lang]}
          title={content.postalCode[lang]}
          cls="relative w-1/2 "
          inCls="rounded-r-md h-full"
        />
      </div>
      <InputField
        type="text"
        name="line1"
        required
        min="2"
        max="150"
        defaultValue={line1}
        autoComplete="address-line1"
        placeholder={content.line1[lang]}
        title={content.line1[lang]}
        cls="relative shadow-sm"
      />
      <InputField
        type="text"
        name="line2"
        min="0"
        max="150"
        defaultValue={line2}
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
