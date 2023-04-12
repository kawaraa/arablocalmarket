import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import { InputField, NumberInputWithControl, Select } from "../../../../../(component)/(styled)/inputs";
import { PriceInputField, WeightInputField } from "../../../../../(component)/custom-inputs";
import Modal from "../../../../../(component)/(styled)/modal";
import shdCnt from "../../../../../(layout)/json/shared-content.json";
import BrowserBarcodeDetecter from "../../../../../(component)/b-barcode-detecter";
import BarcodeScanner from "../../../../../(component)/barcode-scanner";

export default function Variant({ lang, number, onRemove, onUpdate, setMessage, ...v }) {
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
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
    const name = Object.keys(content.options.values).find((name) => !options.find((op) => op.name == name));
    setOptions([...options, { name }]);
  };

  const onScanErr = (text) => setMessage({ type: "error", text, duration: 5 });

  const handleBarcodeDetect = async (barcode) => {
    if (!barcode) return setMessage({ type: "warning", text: shdCnt.noItem[lang], duration: 2.5 });
    onUpdate({ barcode });
    if (showScanner) setShowScanner(false);
  };

  useEffect(() => {
    onUpdate({ options });
  }, [options]);

  useEffect(() => {
    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);

  return (
    <>
      <div className="relative my-3 card p-2 rounded">
        <div className="flex justify-between">
          <h4 className="mb-2">
            {content.h4[lang]} ( {number} )
          </h4>
          {number > 1 && <IconButton icon="crossMark" size="7" onClick={onRemove} cls="hover:text-red" />}
        </div>

        <div className="flex">
          <InputField
            type="text"
            name="barcode"
            disabled={!!v.barcode}
            label={content.barcode.text[lang]}
            placeholder={v.barcode || content.barcode.placeholder[lang]}
            onChange={(e) => onUpdate({ barcode: e.target.value })}
            required
            min="4"
            max="25"
            full
            cls="flex-auto items-center mb-3 ">
            {/* <span className="block text-sm mb-1 rq">{content.barcode.text[lang]}</span> */}
          </InputField>

          <IconButton
            type="button"
            onClick={() => setShowScanner(true)}
            icon="scan"
            title={shdCnt.scanBtn[lang]}
            aria-expanded="true"
            aria-haspopup="dialog"
            cls="w-10 p-1 cursor-pointer hover:text-pc transition"
          />
        </div>

        {options.map((o, index) => (
          <div className="relative pt-2 my-3" key={index}>
            <div className="flex relative">
              <label htmlFor={"name-" + index} className="w-32 mb-1 text-sm rq">
                {content.options.name[lang]}
              </label>
              <span className="w-2"></span>
              <label htmlFor={"value-" + index} className="flex-1 mb-1 text-sm rq">
                {content.options.value[lang]}
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
                {Object.keys(content.options.values).map((op, i) => (
                  <option value={op} disabled={!!options.find((o) => o.name == op)} key={i}>
                    {content.options.values[op][lang] || op}
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
                  placeholder={content.options.values[o.name].placeholder[lang]}
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
          cls="items-center my-5"
          inCls="w-14"
        />
      </div>

      <Modal title={shdCnt.scanner[lang]} open={showScanner} center>
        {browserSupportBarcodeScanner ? (
          <BrowserBarcodeDetecter
            lang={lang}
            onDetect={handleBarcodeDetect}
            onError={onScanErr}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        ) : (
          <BarcodeScanner
            lang={lang}
            onDetect={handleBarcodeDetect}
            onError={onScanErr}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        )}
      </Modal>
    </>
  );
}

const content = {
  h4: { en: "Variant", ar: "صنف" },
  quantity: { en: "Quantity", ar: "الكمية" },
  barcode: {
    text: { en: "Barcode", ar: "رقم المنتج" },
    // text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
    placeholder: { en: "E.g. 875674398784", ar: "مثال, 875674398784" },
  },
  options: {
    name: { en: "Name", ar: "نوع التفاصيل" },
    value: { en: "Value", ar: "التفاصيل" },
    values: {
      WEIGHT: { ar: "الوزن", placeholder: { en: "E.g. 100G", ar: "مثال، 100 جرام" } },
      SIZE: { ar: "الحجم", placeholder: { en: "E.g. Small", ar: "مثال، صغير" } },
      PACKAGING: {
        ar: "التعبئة",
        placeholder: { en: "E.g. cans, jars, bags", ar: "مثال، علبة، مطربان، كيس" },
      },
      COLOR: { ar: "اللون", placeholder: { en: "E.g. Black", ar: "مثال، أسود" } },
      FLAVOR: { ar: "النكهة", placeholder: { en: "E.g. Chicken", ar: "مثال، دجاج" } },
      TYPE: { ar: "النوع", placeholder: { en: "E.g. Cooked", ar: "مثال، مطبوخ" } },
      // SCENT: { ar: "الرائحة", placeholder: { en: "E.g. Sweet", ar: "مثال، حلو" } },
    },
  },
};
