import { InputField, NumberInputField } from "../../../../../(component)/(styled)/inputs";

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

      <label className="">
        <input type="number" name="price" className="card cd_hr fs" />
      </label>

      <label className="">
        <input type="number" name="comparePrice" className="card cd_hr fs" />
      </label>

      <NumberInputField name="quantity" defaultValue={1} />
    </div>
  );
}

const content = {
  barcode: {
    text: { en: "UPC / EAN Barcode", ar: "رمز / رقم المنتج" },
    placeholder: { en: "E.g. 875674398784", ar: "مثال 875674398784" },
  },
};
