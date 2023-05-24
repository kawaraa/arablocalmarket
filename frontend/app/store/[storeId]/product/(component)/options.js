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
  const [maxQuantity, setMaxQuantity] = useState(0);

  const getVariant = (ops) => {
    ops = ops.filter((o) => o);
    const v = variants.find((v) => v.options.filter((o) => ops.includes(o.value)).length == ops.length);
    if (!v || v.quantity < 1) {
      return addMessage({ type: "warning", text: shdCnt.noStockErr[lang], duration: 6 });
    }
    return v;
  };

  const updateItemOptions = (optionIndex, value) => {
    if (optionIndex > 0 && !item.options[optionIndex - 1]) {
      const n = (shdCnt.options.values[Object.keys(options)[optionIndex - 1]][lang] || name).toLowerCase();
      return addMessage({ type: "warning", text: content.selectErr[lang].replace("xxx", n), duration: 6 });
    }

    let ops = optionIndex == 0 ? [] : [...item.options];
    ops[optionIndex] = value;
    const v = getVariant(ops);
    if (!v) return;

    const checkoutItem = {
      storeId: store.id,
      storeName: store.name,
      phone: store.meta?.phone,
      currency: store.currency,
      productNumber: id,
      barcode: v.barcode,
      title: name + " " + v.options.map((o) => o.value).join(" - "),
      imageUrl: image.data?.attributes.formats.thumbnail.url,
      price: v.price,
      discount: discount || 0,
      quantity: item.quantity,
    };

    if (ops.length == v.options.length) {
      window.localStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    }
    document.getElementById("product-price").innerHTML = v.price;
    document.getElementById("product-stock").innerHTML = v.quantity - +item.quantity;

    setMaxQuantity(v.quantity);
    setItem({ ...item, options: ops });
  };

  const updateItemQuantity = (num) => {
    const [chItem] = JSON.parse(window.localStorage.getItem("checkoutItems")) || [];
    if (!chItem) return addMessage({ type: "warning", text: shdCnt.noItemErr[lang], duration: 4 });

    const v = getVariant(item.options);
    if (!v) return;

    chItem.quantity = num < 1 ? 1 : num > v.quantity ? v.quantity : num;
    window.localStorage.setItem("checkoutItems", JSON.stringify([chItem]));

    document.getElementById("product-stock").innerHTML = v.quantity - chItem.quantity;
    setItem({ ...item, quantity: chItem.quantity });
  };

  useEffect(() => {
    window.localStorage.removeItem("checkoutItems");

    const options = {};
    for (const variant of variants) {
      variant.options.forEach((opt) => {
        if (options[opt.name]) options[opt.name].add(opt.value);
        else options[opt.name] = new Set([opt.value]);
      });
    }

    Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));
    setOptions(options);

    const variant = variants.find((v) => v.quantity > 0);
    if (variant) updateItemOptions(0, variant.options[0].value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants]);

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
        max={maxQuantity}
        onChange={updateItemQuantity}
        title="Quantity"
        cls="mt-7 mb-3"
      />
    </>
  );
}

const content = {
  selectErr: { en: "Please select xxx first", ar: "الرجاء تحديد xxx أولاً" },
};
