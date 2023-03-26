import { useState } from "react";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import { InputField, NumberInputWithControl, Select } from "../../../../../(component)/(styled)/inputs";
import { PriceInputField, WeightInputField } from "../../../../../(component)/custom-inputs";

export default function Variant({ lang, number, onRemove, ...v }) {
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

  //  imageId,
  return (
    <div className="relative my-3 card p-2 rounded">
      <div className="flex justify-between">
        <h4 className="mb-2">
          {content.h4[lang]} ( {number} )
        </h4>
        {number > 1 && <IconButton icon="close" size="7" handler={onRemove} cls="hover:text-red" />}
      </div>

      <InputField
        type="text"
        name="barcode"
        disabled={!!v.barcode}
        placeholder={v.barcode || content.barcode.placeholder[lang]}
        required
        min="4"
        max="25"
        full
        cls="mb-2 ">
        <span className="block text-sm mb-1 rq">{content.barcode.text[lang]}</span>
      </InputField>

      <div dir="ltr" className="flex items-end mb-8">
        <PriceInputField lang={lang} defaultValue={v.price} full cls="flex-1 mr-2" />
        <PriceInputField lang={lang} compare defaultValue={v.comparePrice} full cls="flex-1 mr-2" />
        <NumberInputWithControl
          name="quantity"
          required
          min="0"
          max="1000"
          defaultValue={v.quantity || 0}
          label={content.quantity[lang]}
          cls="flex-col"
          inCls="w-14"
        />
      </div>

      {options.map((o, index) => (
        <div className="relative pt-2 my-3 border-t-[1px] border-bc" key={index}>
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
                icon="close"
                size="3"
                handler={() => removeOption(index)}
                cls="!p-0 hover:text-red"
              />
            )}
          </div>
          <div className="flex ">
            <Select
              id={"name-" + index}
              name="name"
              onChange={(e) => handleChangeOption(index, "name", e.target.value)}
              defaultValue={o.name}
              cls="flex w-32 !m-0 rounded-lg"
              inCls="flex-auto !p-0 rounded-lg">
              {Object.keys(content.options.values).map((op, i) => (
                <option value={op} disabled={!!options.find((o) => o.name == op)} key={i}>
                  {content.options.values[op][lang] || op}
                </option>
              ))}
            </Select>
            <span className="w-2"></span>

            {o.name === "WEIGHT" ? (
              <WeightInputField defaultValue={o.value} lang={lang} cls="" />
            ) : (
              <InputField
                id={"value-" + index}
                onChange={(e) => handleChangeOption(index, "value", e.target.value)}
                defaultValue={o.value}
                type="text"
                name="value"
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
          <Button icon="plus" handler={handleAddOption} cls="!p-0 !rounded-full" />
        </div>
      )}
    </div>
  );
}

const content = {
  h4: { en: "Variant", ar: "صنف" },
  quantity: { en: "Quantity", ar: "الكمية" },
  barcode: {
    text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
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
