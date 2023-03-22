import { useState } from "react";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import { InputField, NumberInputField } from "../../../../../(component)/(styled)/inputs";
import { PriceInputField, WeightInputField } from "../../../../../(component)/custom-inputs";

export default function Variant({ lang, number, ...v }) {
  const [options, setOptions] = useState([{}]);
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
        <NumberInputField
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

      {options.map((o, i) => (
        <Option lang={lang} {...o} number={i + 1} key={i} />
      ))}

      <div className="text-right mt-3">
        <Button
          name="addVariant"
          icon="plus"
          handler={() => setOptions([...options, {}])}
          cls="!p-0 !rounded-full"
        />
      </div>
    </div>
  );
}

const Option = ({ lang, number }) => {
  return (
    <div className="relative flex pt-2 my-3 border-t-[1px] border-bc">
      <InputField
        type="text"
        name="name"
        required
        min="1"
        max="10"
        label={content.options.name.text[lang]}
        placeholder={content.options.name.placeholder[lang]}
        full
        cls="flex-1 flex items-end"
      />
      <span className="w-2"></span>
      <InputField
        type="text"
        name="value"
        required
        min="1"
        max="10"
        label={content.options.value.text[lang]}
        placeholder={content.options.value.placeholder[lang]}
        full
        cls="flex-1 flex items-end"
      />
      {number > 1 && <IconButton cls="absolute top-1 right-0 p-0" icon="close" size="3" />}
    </div>
  );
};

const content = {
  h4: { en: "Variant", ar: "صنف" },
  quantity: { en: "Quantity", ar: "الكمية" },
  barcode: {
    text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
    placeholder: { en: "E.g. 875674398784", ar: "مثال, 875674398784" },
  },
  options: {
    name: { text: { en: "Name", ar: "الاسم" }, placeholder: { en: "E.g. Color", ar: "مثال، لون" } },
    value: { text: { en: "Value", ar: "القيمة" }, placeholder: { en: "E.g. Black", ar: "مثال، أسود" } },
  },
};
