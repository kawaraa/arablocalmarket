import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import { InputField, NumberInputWithControl, Select } from "../../../../../(component)/(styled)/inputs";
import { PriceInputField, WeightInputField } from "../../../../../(component)/custom-inputs";
import shdCnt from "../../../../../(layout)/json/shared-content.json";
import BarcodeScannerPopup from "../../../../../(component)/(styled)/barcode-scanner-popup";

export default function Variant({ lang, number, onRemove, onUpdate, setMessage, ...v }) {
  const [options, setOptions] = useState(v.options || [{ name: "WEIGHT" }]);

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  const handleChangeOption = (index, key, value) => {
    const copy = [...options];
    copy[index][key] = value;
    setOptions(copy);
  };
  const handleAddOption = () => {
    if (!(options.length < 3)) return;
    const name = Object.keys(shdCnt.options.values).find((name) => !options.find((op) => op.name == name));
    setOptions([...options, { name }]);
  };

  const onScanErr = (text) => setMessage({ type: "error", text, duration: 5 });

  const handleBarcodeDetect = async (barcode) => {
    if (!barcode) return setMessage({ type: "warning", text: shdCnt.noItem[lang], duration: 2.5 });
    onUpdate({ barcode });
  };

  useEffect(() => {
    onUpdate({ options });
  }, [options]);

  return (
    <div className="relative my-5 card p-2 rounded">
      <div className="flex justify-between">
        <h4 className="mb-2 font-semibold">
          {content.h4[lang]} ( {number} )
        </h4>
        {onRemove && <IconButton icon="crossMark" size="7" onClick={onRemove} cls="text-red" />}
      </div>

      <div className="flex items-center mb-3">
        <InputField
          type="text"
          name="barcode"
          // disabled={v.barcode?.length > 4}
          value={v.barcode}
          onChange={(e) => onUpdate({ barcode: e.target.value + "" })}
          required
          min="5"
          max="25"
          label={content.barcode.text[lang]}
          placeholder={shdCnt.ex[lang] + " 875674398784"}
          full
          cls="flex-1 items-center"
        />

        <BarcodeScannerPopup
          lang={lang}
          onBarcodeDetect={handleBarcodeDetect}
          onError={onScanErr}
          btnSize="10"
        />
      </div>

      {options.map((o, index) => (
        <div className="relative pt-2 my-3" key={index}>
          <div className="flex relative">
            <label htmlFor={"name-" + index} className="w-32 mb-1 text-sm rq">
              {shdCnt.options.name[lang]}
            </label>
            <span className="w-2"></span>
            <label htmlFor={"value-" + index} className="flex-1 mb-1 text-sm rq">
              {shdCnt.options.value[lang]}
            </label>
            {index + 1 > 1 && (
              <IconButton
                icon="crossMark"
                size="3"
                onClick={() => removeOption(index)}
                cls="!p-0 hover:text-red"
              />
            )}
          </div>
          <div className="flex ">
            <Select
              id={"name-" + index}
              onChange={(e) => handleChangeOption(index, "name", e.target.value)}
              defaultValue={o.name}
              cls="flex w-32 rounded-lg"
              inCls="!w-32 flex-auto !p-0 rounded-lg">
              {Object.keys(shdCnt.options.values).map((op, i) => (
                <option value={op} disabled={!!options.find((o) => o.name == op)} key={i}>
                  {shdCnt.options.values[op][lang] || op}
                </option>
              ))}
            </Select>
            <span className="w-2"></span>

            {o.name === "WEIGHT" ? (
              <WeightInputField
                lang={lang}
                required
                value={o.value}
                onChange={(v) => handleChangeOption(index, "value", v)}
                cls="items-stretch"
              />
            ) : (
              <InputField
                type="text"
                id={"value-" + index}
                defaultValue={o.value}
                onChange={(e) => handleChangeOption(index, "value", e.target.value)}
                required
                min="1"
                max="10"
                placeholder={shdCnt.options.values[o.name].placeholder[lang]}
                full
                cls="flex-1"
              />
            )}
          </div>
        </div>
      ))}

      {options.length < 3 && (
        <div className="text-right mt-3">
          <Button icon="plus" onClick={handleAddOption} cls="!p-0 !rounded-full" />
        </div>
      )}

      <div dir="ltr" className="flex my-5">
        <PriceInputField
          lang={lang}
          defaultValue={v.price}
          onChange={(e) => onUpdate({ price: e.target.value })}
          full
          cls="items-center"
        />
        <span className="w-2 h-2"></span>
        <PriceInputField
          lang={lang}
          compare
          defaultValue={v.comparePrice}
          onChange={(e) => onUpdate({ comparePrice: e.target.value })}
          full
          cls="items-center"
        />
      </div>

      <NumberInputWithControl
        name="quantity"
        required
        min="0"
        max="1000"
        defaultValue={v.quantity || 0}
        onChange={(num) => onUpdate({ quantity: num })}
        label={content.quantity[lang]}
        cls="items-center mb-5"
        inCls="w-14"
      />
    </div>
  );
}

const content = {
  h4: { en: "Variant", ar: "صنف" },
  quantity: { en: "Quantity", ar: "الكمية" },
  barcode: {
    text: { en: "Barcode", ar: "رقم المنتج" },
    // text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
  },
};
