const stripePlans = (process.env.NEXT_PUBLIC_PLANS || "").split(",");
const currency = process.env.NEXT_PUBLIC_CURRENCY || "€";

const plans = [
  {
    subscription: stripePlans[0],
    name: { en: "Basic", ar: "أساسي" },
    desc: {
      en: "Ideal for a startup small store or large store that want to give it a try",
      ar: "جيده لمتجر صغير ناشئ أو متجر كبير يرغب في تجربته",
    },
    price: "30",
    currency,
    features: [
      { en: "Products limit: 200", ar: "حد المنتجات: 200" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
  {
    subscription: stripePlans[1],
    name: { en: "Standard", ar: "قياسي" },
    desc: {
      en: "Ideal for a medium store that has a few products and need to manage them",
      ar: "جيده لمتجر متوسط ​​يحتوي على عدد قليل من المنتجات ويحتاج إلى إدارتها",
    },
    price: "50",
    currency,
    features: [
      { en: "Products limit: 500", ar: "حد المنتجات: 500" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
  {
    subscription: stripePlans[2],
    name: { en: "Professional", ar: "احترافي" },
    desc: {
      en: "Ideal for a large store that has more products and needs to manage them",
      ar: "جيده لمتجر كبير يحتوي على المزيد من المنتجات ويحتاج إلى إدارتها",
    },
    price: "70",
    currency,
    features: [
      { en: "Products limit: 1000", ar: "حد المنتجات: 1000" },
      { en: "Trial: 30 days", ar: "التجربة: 30 يومًا" },
      { en: "Cancel anytime", ar: "إلغاء في أي وقت" },
    ],
  },
];
export default plans;
