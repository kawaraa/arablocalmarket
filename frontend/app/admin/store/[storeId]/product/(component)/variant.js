import { InputField, NumberInputField } from "../../../../../(component)/(styled)/inputs";
import { PriceInputField } from "../../../../../(component)/custom-inputs";

export default function Variant({ lang, ...v }) {
  //  imageId,   weight, weightUnit, options: name, value
  return (
    <div>
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
        <NumberInputField name="quantity" defaultValue={1} cls="" inCls="w-14" />
      </div>
    </div>
  );
}

const content = {
  barcode: {
    text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
    placeholder: { en: "E.g. 875674398784", ar: "مثال 875674398784" },
  },
};
