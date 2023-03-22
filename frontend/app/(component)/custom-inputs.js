"use client";

import { CheckCard, InputField, Select } from "./(styled)/inputs";

export function NameInputField({ lang, first, ...p }) {
  const t = first ? content.firstName[lang] : content.lastName[lang];

  return (
    <InputField
      type="text"
      name={first ? "firstName" : "lastName"}
      required
      min="4"
      max="15"
      autoComplete={first ? "given-name" : "family-name"}
      placeholder={t}
      title={t}
      {...p}
    />
  );
}
export function EmailInputField({ lang, ...p }) {
  return (
    <InputField
      type="email"
      name="email"
      required
      min="10"
      max="30"
      autoComplete="email"
      placeholder={content.email[lang]}
      title={content.email[lang]}
      {...p}
    />
  );
}
export function PhoneInputField({ lang, ...p }) {
  return (
    <InputField
      type="tel"
      name="phone"
      required
      min="10"
      max="15"
      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      autoComplete="tel"
      placeholder="E.g. +31639793297"
      title={content.phone[lang]}
      {...p}
    />
  );
}
export function PswInputField({ lang, confirm, ...p }) {
  const newProps = { ...p, ...(!confirm ? {} : { name: "confirmPassword", autoComplete: "new-password" }) };
  const t = !confirm ? content.password[lang] : content.confirmPassword[lang];
  return (
    <InputField
      type="password"
      name="password"
      required
      min="9"
      max="50"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      autoComplete="current-password"
      placeholder={t}
      title={t}
      {...newProps}
    />
  );
}

export function CurrencySelect({ lang, ...p }) {
  return (
    <Select
      title={content.currencies.text[lang]}
      cls="flex items-center"
      inCls="mx-1 !p-[2px] rounded-full"
      {...p}>
      {content.currencies.values.map((currency, i) => (
        <option value={currency} key={i}>
          {currency}
        </option>
      ))}
    </Select>
  );
}
export function DaysCheckButtons({ lang, checkedDays, ...p }) {
  return (
    <div className="flex flex-wrap my-3">
      {content.day.values.map((d, i) => (
        <CheckCard
          type="checkbox"
          name={d.en}
          checked={!!checkedDays.find(({ name }) => name == d.en)}
          key={i}
          cls="flex justify-center items-center flex-1 m-1 py-2 px-2 capitalize"
          {...p}>
          {d[lang]}
        </CheckCard>
      ))}
    </div>
  );
}
export function OpeningHoursSelect({ lang, ...p }) {
  return (
    <Select title={content[p.name][lang]} cls="flex items-center" inCls="mx-1 !p-[2px] rounded-full" {...p}>
      {content.periods.map((period, i) =>
        content.times.map((time, ii) => (
          <option value={time + "-" + period[lang]} key={i + ii}>
            {time} {period[lang]}
          </option>
        ))
      )}
    </Select>
  );
}
export function DayOpeningHours({ lang, day, onDayUpdate }) {
  const handleUpdate = () => {
    onDayUpdate({ ...day, [e.target.name]: e.target.value });
  };
  return (
    <div className="mb-2">
      <h6 className="font-semibold mb-1">{content.day.values.find((d) => d.en == day.name)[lang]}</h6>
      <div className="flex justify-evenly">
        <OpeningHoursSelect lang={lang} name="open" onChange={handleUpdate} />
        <OpeningHoursSelect lang={lang} name="close" onChange={handleUpdate} />
      </div>
    </div>
  );
}

export function CategorySelect({ lang, ...p }) {
  return (
    <Select
      title={content.categories.text[lang]}
      cls="flex items-center"
      inCls="mx-1 !p-[2px] rounded-full"
      {...p}>
      {content.categories.values.map((v, i) => (
        <option value={v.key} key={i}>
          {v.text[lang]}
        </option>
      ))}
    </Select>
  );
}

export const categories = [
  {
    text: { en: "Vegetables and fruits", ar: "الخضروات والفواكه" },
    key: "vegetable",
    image: "/produce-vegetables-clipart.png",
    numberOfItems: 1,
  },
  { text: { en: "Bakery", ar: "مخبوزات" }, key: "bakery", image: "/bread-clipart.png", numberOfItems: 10 },
  {
    text: { en: "Meat and poultry", ar: "لحم و دواجن" },
    key: "meat",
    image: "/cut-of-meat-clipart.png",
    numberOfItems: 13,
  },
  {
    text: { en: "Seafood", ar: "مأكولات بحرية" },
    key: "seafood",
    image: "/fish-clipart.png",
    numberOfItems: 11,
  },
  {
    text: { en: "Deli", ar: "الأطعمة" },
    key: "deli",
    image: "/burger-prepared-food-clipart.png",
    numberOfItems: 3,
  },
  {
    text: { en: "Dairy and eggs", ar: "الألبان والبيض" },
    key: "dairy",
    image: "/dairy-clipart.png",
    numberOfItems: 31,
  },
  //text:{ { name: "Frozen foods"}, image: "", numberOfItems: 1031 },
  {
    text: { en: "Beverages", ar: "المشروبات" },
    key: "beverages",
    image: "/beverages-clipart.png",
    numberOfItems: 52,
  },
  {
    text: { en: "Snacks and candy", ar: "الوجبات الخفيفة والحلوى" },
    key: "snack",
    image: "/snacks-clipart.png",
    numberOfItems: 86,
  },
  {
    text: { en: "Canned and packaged goods", ar: "البضائع المعلبة والمعبأة" },
    key: "canned",
    image: "/canned-goods-clipart.png",
    numberOfItems: 25,
  },
  {
    text: {
      en: "Legumes and grains",
      ar: "الحبوب والبقوليات",
    },
    key: "legumes",
    image: "/legumes-grains-clipart.png",
    numberOfItems: 1031,
  },
  {
    text: {
      en: "Nuts and seeds",
      ar: "المكسرات والبذور",
    },
    key: "seeds",
    image: "/nuts-seeds-clipart.png",
    numberOfItems: 1031,
  },
  {
    text: { en: "Spices and sauces", ar: "البهارات والصلصات" },
    key: "spices",
    image: "/condiments-sauces-spices-clipart.png",
    numberOfItems: 45,
  },
  {
    text: { en: "Cleaning supplies", ar: "معدات تنظيف" },
    key: "cleaning",
    image: "/cleaning-supplies-clipart.png",
    numberOfItems: 32,
  },
  {
    text: { en: "Care products", ar: "منتجات العناية" },
    key: "care",
    image: "/care-products-clipart.png",
    numberOfItems: 24,
  },
  // {text:{ name: "Health - wellness products"}, image: "", numberOfItems: 1031 },
  {
    text: { en: "Baby supplies", ar: "مستلزمات الأطفال" },
    key: "baby",
    image: "/baby-food-clipart.png",
    numberOfItems: 35,
  },
  // {text:{ name: "Office - school supplies"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Electronics"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Home - kitchen supplies"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Seasonal items"}, image: "", numberOfItems: 1031 },
];

const content = {
  firstName: { en: "First name", ar: "الاسم" },
  lastName: { en: "Last name", ar: "اسم العائلة" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  email: { en: "Email address", ar: "البريد الإلكتروني" },
  phone: { en: "Phone number", ar: "رقم الهاتف" },
  password: { en: "Password", ar: "كلمة المرور" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  currencies: {
    text: { en: "Currency", ar: "العملة" },
    values: ["$-USD", "€-EUR", "£-GBP", "$-AUD", "$-CAD", "CHF-CHF", "₺-TRY"],
  },
  categories: {
    text: { en: "Category", ar: "الفئة" },
    values: categories,
  },
  day: {
    en: "Day",
    ar: "يوم",
    values: [
      { en: "monday", ar: "الإثنين" },
      { en: "tuesday", ar: "الثلاثاء" },
      { en: "wednesday", ar: "الأربعاء" },
      { en: "thursday", ar: "الخميس" },
      { en: "friday", ar: "الجمعة" },
      { en: "saturday", ar: "السبت" },
      { en: "sunday", ar: "الأحد" },
    ],
  },
  open: { en: "Opens", ar: "يفتح" },
  close: { en: "Closes", ar: "يغلق" },
  periods: [
    { en: "AM", ar: "صباحًا" },
    { en: "PM", ar: "مساءً" },
  ],
  times: [
    "01.00",
    "01.15",
    "01.30",
    "01.45",
    "02.00",
    "02.15",
    "02.30",
    "02.45",
    "03.00",
    "03.15",
    "03.30",
    "03.45",
    "04.00",
    "04.15",
    "04.30",
    "04.45",
    "05.00",
    "05.15",
    "05.30",
    "05.45",
    "06.00",
    "06.15",
    "06.30",
    "06.45",
    "07.00",
    "07.15",
    "07.30",
    "07.45",
    "08.00",
    "08.15",
    "08.30",
    "08.45",
    "09.00",
    "09.15",
    "09.30",
    "09.45",
    "10.00",
    "10.15",
    "10.30",
    "10.45",
    "11.00",
    "11.15",
    "11.30",
    "11.45",
    "12.00",
    "12.15",
    "12.30",
    "12.45",
  ],
};
