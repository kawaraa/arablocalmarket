const stripePlans = (process.env.NEXT_PUBLIC_PLANS || "").split(",");
const currency = process.env.NEXT_PUBLIC_CURRENCY || "€";

const plans = [
  {
    subscription: stripePlans[0],
    name: { en: "Starter", ar: "مبدئ" },
    desc: {
      en: "Ideal for a starter and very small business or who wants to give it a try",
      ar: "مثالي للمبتدئين وأعمال التجاري الصغيرة جدًا أو لمن يريد تجربتها",
    },
    price: "10",
    currency,
    features: [
      { en: "Products limit: 100", ar: "حد المنتجات: 100" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
  {
    subscription: stripePlans[1],
    name: { en: "Basic", ar: "أساسي" },
    desc: {
      en: "Ideal for a startup small store or large store that want to give it a try",
      ar: "جيد لمتجر صغير ناشئ أو متجر كبير يرغب في تجربته",
    },
    price: "30",
    currency,
    features: [
      { en: "Products limit: 350", ar: "حد المنتجات: 350" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
  {
    subscription: stripePlans[2],
    name: { en: "Standard", ar: "قياسي" },
    desc: {
      en: "Ideal for a medium store that has a few products and need to manage them",
      ar: "جيد لمتجر متوسط ​​يحتوي على عدد قليل من المنتجات ويحتاج إلى إدارتها",
    },
    price: "50",
    currency,
    features: [
      { en: "Products limit: 700", ar: "حد المنتجات: 700" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
  {
    subscription: stripePlans[3],
    name: { en: "Professional", ar: "احترافي" },
    desc: {
      en: "Ideal for a large store that has more products and needs to manage them",
      ar: "جيد لمتجر كبير يحتوي على المزيد من المنتجات ويحتاج إلى إدارتها",
    },
    price: "70",
    currency,
    features: [
      { en: "Products limit: 1500", ar: "حد المنتجات: 1500" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
];
export default plans;
