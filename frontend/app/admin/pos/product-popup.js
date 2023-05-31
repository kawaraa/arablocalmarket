"use client";
import { useEffect, useState } from "react";
import VariantOptions from "../../(component)/variant-options";
import { NumberInputWithControl } from "../../(component)/(styled)/inputs";
import Modal from "../../(component)/(styled)/modal";
import shdCnt from "../../(layout)/json/shared-content.json";

export default function SelectProductPopup({ lang, open, product, onAddItem, onCancel, setMsg }) {
  const [item, setItem] = useState({ options: [], quantity: 1 });
  const [options, setOptions] = useState({});

  let index = product?.variants.findIndex(
    (v) => v.options.filter((o) => item.options.includes(o.value)).length == item.options.length
  );
  if (index < 0) index = 0;

  const handleAddItem = () => {
    const { barcode, price, options } = product.variants[index];
    const newItem = { productNumber: product.id, barcode, price, quantity: item.quantity };
    if (!item.options[0] || item.options.length != options.length) {
      return setMsg({ type: "warning", text: shdCnt.noItemErr[lang], duration: 5 });
    }
    newItem.title = `${product.name} ${item.options.join(" - ")}`;
    newItem.imageUrl = product.image.data?.attributes.formats.thumbnail.url;
    onAddItem(newItem);
  };

  const updateItemOptions = (index, value) => {
    const copy = { ...item };
    copy.options[index] = value;
    setItem(copy);
  };

  const updateItemQuantity = (num) => {
    const copy = { ...item };
    const stock = product.variants[index].quantity;
    copy.quantity = num < 1 ? 1 : num > stock ? stock : num;
    setItem(copy);
  };

  useEffect(() => {
    if (product?.variants) {
      const options = {};
      for (const variant of product.variants) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, item.options, open]);

  useEffect(() => {
    if (!product) setItem({ options: [], quantity: 1 });
    else {
      const variant = product.variants[index];
      const copy = { ...item };
      copy.options[0] = variant.options[0].value;
      setItem(copy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Modal lang={lang} open={open} onCancel={onCancel} onApprove={handleAddItem} okBtn={shdCnt.add[lang]}>
      {product && (
        <div dir="auto" className="mt-10">
          {Object.keys(options).map((name, i) => (
            <VariantOptions
              name={shdCnt.options.values[name][lang]}
              values={options[name]}
              onSelect={(v) => updateItemOptions(i, v)}
              selectedOptions={item.options}
              label
              key={i}
            />
          ))}
          <div dir="auto" className="w-full mb-3 mt-10 flex justify-between items-center">
            <div className="text-sm font-light">
              <span className="font-medium">{product.variants[index].quantity - item.quantity}</span>{" "}
              {shdCnt.stock[lang]}
            </div>
            <NumberInputWithControl
              name="quantity"
              value={item.quantity || 0}
              min="1"
              max={product.variants[index].quantity}
              onChange={updateItemQuantity}
              title="Quantity"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
