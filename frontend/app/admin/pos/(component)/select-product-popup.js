"use client";

import { useEffect, useState } from "react";
import { NumberInputWithControl } from "../../../(component)/(styled)/inputs";
import Modal from "../../../(component)/(styled)/modal";
import VariantOptions from "../../../(component)/variant-options";

export default function SelectProductPopup({ lang, open, product, onAddItem, onCancel }) {
  const [item, setItem] = useState({ quantity: 1 });
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleUpdateItem = (data) => {
    setItem({ ...item, ...data });
  };

  const updateSelectedOptions = (index, value) => {
    const options = [...selectedOptions];
    options[index] = value;
    setSelectedOptions(options);
  };

  useEffect(() => {
    const options = {};
    if (product) {
      for (const variant of product.variants) {
        const sV = variant.options.find((opt) => !selectedOptions[0] || selectedOptions.includes(opt.value));
        variant.options.forEach((opt, i) => {
          if (sV || i === 0) {
            if (options[opt.name]) options[opt.name].add(opt.value);
            else options[opt.name] = new Set([opt.value]);
          }
        });
      }
    }

    Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));
    setOptions(options);
  }, [selectedOptions, open]);

  return (
    <Modal
      open={open}
      onCancel={() => onCancel(null)}
      onApprove={() => onAddItem(item)}
      okBtn={content.addBtn[lang]}>
      {product && (
        <div className="mt-10">
          {Object.keys(options).map((name, i) => (
            <VariantOptions
              name={name}
              values={options[name]}
              onSelect={(v) => updateSelectedOptions(i, v)}
              selectedOptions={selectedOptions}
              label
              key={i}
            />
          ))}
          <div className="relative w-full flex mb-3 mt-10 justify-center items-center">
            <NumberInputWithControl
              name="quantity"
              value={item.quantity || 0}
              min="1"
              max="10"
              onChange={(n) => handleUpdateItem({ quantity: item.quantity + n < 1 ? 0 : item.quantity + n })}
              title="Quantity"
            />
            <div className="absolute right-3 text-sm font-light">
              <span className="font-medium">{15}</span> in Stock
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

const content = {
  addBtn: { en: "Add", ar: "أضف" },
};
