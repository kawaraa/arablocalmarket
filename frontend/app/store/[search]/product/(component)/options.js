"use client";

import { useContext, useEffect, useState } from "react";
import VariantOptions from "../../../../(component)/variant-options";
import { NumberInputWithControl } from "../../../../(component)/(styled)/inputs";
import { AppSessionContext } from "../../../../app-session-context";
import shsCnt from "../../../../(layout)/json/shared-content.json";

export default function Options({ store, id, variants, name, image }) {
  const { lang, addMessage } = useContext(AppSessionContext);
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(variants[0].quantity);

  const updateSelectedOptions = (index, value) => {
    const sp = [...selectedOptions];
    sp[index] = value;

    if (sp.length == Object.keys(options).length) {
      const variant = variants.find((v) => v.options.filter((o) => sp.includes(o.value)).length == sp.length);
      const item = {
        storeId: store.id,
        storeName: store.name,
        phone: store.meta?.phone,
        currency: store.currency,
        productNumber: id,
        barcode: variant.barcode,
        image: image.data?.attributes?.url,
        title: `${name} - ${sp.join(" - ")}`,
        price: variant.price,
        discount: variant.discount || 0,
        quantity,
      };

      window.localStorage.setItem("checkoutItems", JSON.stringify([item]));
      document.getElementById("product-price").innerHTML = variant.price;
      document.getElementById("product-stock").innerHTML = variant.quantity;

      setMaxQuantity(variant.quantity);
    }

    setSelectedOptions(sp);
  };

  const updateQuantity = (num) => {
    const items = JSON.parse(window.localStorage.getItem("checkoutItems"));
    if (!items) return addMessage({ type: "warning", text: shsCnt.noItemErr[lang], duration: 7 });
    items[0].quantity = num < 1 ? 1 : num <= maxQuantity ? num : maxQuantity;
    window.localStorage.setItem("checkoutItems", JSON.stringify(items));
    setQuantity(items[0].quantity);
  };

  useEffect(() => {
    const options = {};

    for (const variant of variants) {
      const sV = variant.options.find((opt) => !selectedOptions[0] || selectedOptions.includes(opt.value));
      variant.options.forEach((opt, i) => {
        if (sV || i === 0) {
          if (options[opt.name]) options[opt.name].add(opt.value);
          else options[opt.name] = new Set([opt.value]);
        }
      });
    }

    Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));
    setOptions(options);
  }, [selectedOptions]);

  useEffect(() => {
    window.localStorage.removeItem("checkoutItems");
    if (window.localStorage.getItem("checkoutItems")) window.localStorage.removeItem("checkoutItems");
  }, []);

  return (
    <>
      {Object.keys(options).map((name, i) => (
        <VariantOptions
          name={name}
          values={options[name]}
          onSelect={(value) => updateSelectedOptions(i, value)}
          selectedOptions={selectedOptions}
          label
          key={i}
        />
      ))}
      <NumberInputWithControl
        name="quantity"
        value={quantity}
        step="1"
        min="1"
        max={maxQuantity}
        onChange={updateQuantity}
        title="Quantity"
        cls="mt-7 mb-3 !flex justify-center"
      />
    </>
  );
}
