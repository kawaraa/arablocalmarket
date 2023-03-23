import { useState } from "react";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import {
  InputField,
  NumberInputWithControl,
  InputWithSelect,
  Select,
} from "../../../../../(component)/(styled)/inputs";
import { PriceInputField, WeightInputField } from "../../../../../(component)/custom-inputs";

export default function Variant({ lang, number, ...v }) {
  const [options, setOptions] = useState([{ name: "WEIGHT" }]);

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
        {number > 1 && <IconButton icon="close" size="7" />}
      </div>

      <InputField
        type="text"
        name="barcode"
        placeholder={content.barcode.placeholder[lang]}
        required
        min="4"
        max="25"
        full
        cls="mb-2">
        <span className="block text-sm mb-1 rq">{content.barcode.text[lang]}</span>
      </InputField>

      <div dir="ltr" className="flex items-end">
        <PriceInputField lang={lang} full cls="flex-1 mr-2" />
        <PriceInputField lang={lang} compare full cls="flex-1 mr-2" />
        <NumberInputWithControl
          name="quantity"
          required
          min="0"
          max="1000"
          defaultValue={1}
          label={content.quantity[lang]}
          cls="flex-col"
          inCls="w-14"
        />
      </div>

      <WeightInputField lang={lang} label cls="mt-3" />
      {/* <InputWithSelect lang={lang} label cls="mt-3" /> */}

      {options.map((o, index) => (
        <div className="relative pt-2 my-3 border-t-[1px] border-bc" key={index}>
          <div className="flex">
            <label htmlFor={"name-" + index} className="w-32 mb-1 font-semibold rq">
              {content.options.name[lang]}
            </label>
            <span className="w-2"></span>
            <label htmlFor={"value-" + index} className="flex-1 mb-1 font-semibold rq">
              {content.options.value[lang]}
            </label>
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
              <WeightInputField lang={lang} label cls="mt-3" />
            ) : (
              <InputField
                id={"value-" + index}
                onChange={(e) => handleChangeOption(index, "value", e.target.value)}
                value={o.value}
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

          {index + 1 > 1 && (
            <IconButton
              cls="absolute top-1 right-0 !p-0"
              icon="close"
              size="3"
              handler={() => removeOption(index)}
            />
          )}
        </div>
      ))}

      <div className="text-right mt-3">
        <Button icon="plus" handler={handleAddOption} cls="!p-0 !rounded-full" />
      </div>
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

  // options: {
  //   name: { text: { en: "Name", ar: "الاسم" }, placeholder: { en: "E.g. Color", ar: "مثال، لون" } },
  //   value: { text: { en: "Value", ar: "القيمة" }, placeholder: { en: "E.g. Black", ar: "مثال، أسود" } },
  // },
};
