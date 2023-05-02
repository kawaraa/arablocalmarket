"use client";
import { useContext, useEffect, useState } from "react";
import VariantOptions from "../../../../(component)/variant-options";
import { NumberInputWithControl } from "../../../../(component)/(styled)/inputs";
import { AppSessionContext } from "../../../../app-session-context";
import shdCnt from "../../../../(layout)/json/shared-content.json";

export default function Options({ store, id, variants, name, image, discount }) {
  const { lang, addMessage } = useContext(AppSessionContext);
  const [item, setItem] = useState({ options: [], quantity: 1 });
  const [options, setOptions] = useState({});

  let index = variants.findIndex(
    (v) => v.options.filter((o) => item.options.includes(o.value)).length == item.options.length
  );
  if (index < 0) index = 0;

  const updateItemOptions = (optionIndex, value) => {
    const variant = variants[index];
    const copy = { ...item };
    copy.options[optionIndex] = value;

    const checkoutItem = {
      storeId: store.id,
      storeName: store.name,
      phone: store.meta?.phone,
      currency: store.currency,
      productNumber: id,
      barcode: variant.barcode,
      title: name + " " + variant.options.map((o) => o.value).join(" - "),
      imageUrl: image.data?.attributes.formats.thumbnail.url,
      price: variant.price,
      discount: discount || 0,
      quantity: copy.quantity,
    };

    window.localStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    document.getElementById("product-price").innerHTML = variant.price;
    document.getElementById("product-stock").innerHTML = +variant.quantity - +copy.quantity;

    setItem(copy);
  };

  const updateItemQuantity = (num) => {
    const stock = +variants[index].quantity;
    const items = JSON.parse(window.localStorage.getItem("checkoutItems"));
    if (!items) return addMessage({ type: "warning", text: shdCnt.noItemErr[lang], duration: 4 });

    items[0].quantity = num < 1 ? 1 : num > stock ? stock : num;
    window.localStorage.setItem("checkoutItems", JSON.stringify(items));

    const copy = { ...item };
    copy.quantity = items[0].quantity;

    document.getElementById("product-stock").innerHTML = stock - copy.quantity;
    setItem(copy);
  };

  useEffect(() => {
    const options = {};
    for (const variant of variants) {
      const sV = variant.options.find((opt) => !item.options[0] || item.options.includes(opt.value));
      variant.options.forEach((opt, i) => {
        if (sV || i === 0) {
          if (options[opt.name]) options[opt.name].add(opt.value);
          else options[opt.name] = new Set([opt.value]);
        }
      });
    }

    Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));
    setOptions(options);
  }, [item.options]);

  useEffect(() => {
    // window.localStorage.removeItem("checkoutItems");

    if (variants) {
      const { options } = variants[index];
      const copy = { ...item };
      copy.options[0] = options[0].value;
      setItem(copy);
      options.forEach((o, i) => updateItemOptions(i, o.value));
    }
  }, []);

  return (
    <>
      {Object.keys(options).map((name, i) => (
        <VariantOptions
          name={shdCnt.options.values[name][lang] || name}
          values={options[name]}
          onSelect={(value) => updateItemOptions(i, value)}
          selectedOptions={item.options}
          label
          key={i}
        />
      ))}
      <NumberInputWithControl
        name="quantity"
        value={item.quantity}
        step="1"
        min="1"
        max={variants[index].quantity}
        onChange={updateItemQuantity}
        title="Quantity"
        cls="mt-7 mb-3"
      />
    </>
  );
}
