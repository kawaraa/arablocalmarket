export function random() {
  return Math.round(Math.random() * 800);
}

export function getCssDelay() {
  return { animationDelay: Math.random() * 600 + "ms" };
}

export function extractLang(params, searchParams, cookieLang) {
  let lang = (params?.lang || searchParams?.lang || cookieLang)?.toLowerCase();
  return !/en|ar/gim.test(lang) ? "en" : lang;
}

export function shouldShowIosInstallModal() {
  const isIos = /mac os|iphone|ipad|ipod/gim.test(window.navigator.userAgent); // detect if the device is on iOS
  const isInstalled = "standalone" in window.navigator; // check if the device is in standalone mode
  // show the modal only once
  return isIos && !isInstalled && !JSON.parse(localStorage.getItem("shownIosInstallModal"));
}

export function generateMetaData() {
  return {
    // title: content.title[lang],
    // description: content.description[lang],
    // keywords: content.keywords[lang],
    // category: "technology",
    // authors: [{ name: "ArabLocalMarket", url: "https://arablocalmarket.com" }],
    // themeColor: themeMode == "dark" ? "#121212" : "#ffffff",
    // themeColor: [
    //   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    //   { media: "(prefers-color-scheme: dark)", color: "#121212" },
    // ],
    // colorScheme: themeMode,
    // icons: {
    //   icon: { type: "image/png", url: "/img/favicon-16x16.png", sizes: "16x16" },
    //   shortcut: { type: "image/ico", url: "/img/favicon.ico", sizes: "48x48" },
    //   apple: { type: "image/png", url: "/img/apple-touch-icon.png", sizes: "180x180" },
    //   other: [
    //     { rel: "icon", type: "image/png", url: "/img/favicon-32x32.png", sizes: "32x32" },
    //     { rel: "icon", type: "image/png", url: "/img/android-chrome-192x192.png", sizes: "192x192" },
    //     { rel: "icon", type: "image/png", url: "/img/android-chrome-512x512.png", sizes: "512x512" },
    //   ],
    // },
    // manifest: "/manifest.json",
    // other: {
    //   google: "notranslate",
    // },
    // openGraph: {
    //   title: content.title[lang],
    //   description: content.description[lang],
    //   url: "https://arablocalmarket.com",
    //   siteName: "ArabLocalMarket",
    //   images: [
    //     { url: "https://arablocalmarket.com/img/android-chrome-512x512.png", width: 600, height: 600 },
    //   ],
    //   type: "website",
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: content.title[lang],
    //   description: content.description[lang],
    //   siteId: "1467726470533754880",
    //   creator: "@ArabLocalMarket",
    //   creatorId: "1467726470533754880",
    //   images: ["https://arablocalmarket.com/img/android-chrome-512x512.png"],
    // },
    // appleWebApp: {
    //   title: content.title[lang],
    //   statusBarStyle: "black-translucent",
    // },
  };
}

export class Cookies {
  static set(name, value, expireDays = 180, date = new Date()) {
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;samesite=lax;`;
  }

  static get(name) {
    return Cookies.getAll()[name] || null;
  }
  static getAll() {
    return Cookies.parse(document.cookie);
  }
  static remove(name) {
    // To delete a cookie, Just set the expires parameter to a past date:
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  static parse(cookies) {
    const result = {};
    (cookies || "").split(";").forEach((str) => {
      const cookie = str.trim().split("=");
      result[cookie[0].trim()] = cookie[1];
    });
    return result;
  }
}

export function copyText(text = "", cb) {
  const copy = () => {
    try {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.value = text;
      input.select(); /* Select the text field */
      input.setSelectionRange(0, 99999); /* Select the text for mobile devices */
      document.execCommand("copy");
      input.remove();
    } catch (er) {
      if (cb) cb(false);
    }
    if (cb) cb(true);
  };
  if (!navigator.clipboard) return cb(false);
  navigator.clipboard.writeText(text).then(() => cb(true), copy);
}

export function validateError(error) {
  console.log("validateError: >>> ", error);
  const lang = Cookies.get("lang") || "en";
  let name = Object.keys(errors).find((errName) => error?.toLowerCase().includes(errName));
  if (/^(?=.*phone)(?=.*unique).*$/gim.test(error)) name = "phoneExist";
  return name ? errors[name][lang] : errors.wrong[lang];
}

const errors = {
  wrong: {
    en: "Something went wrong, please try again later",
    ar: "حدث خطأ ما، يرجى المحاولة فى وقت لاحق",
  },
  "failed to fetch": {
    en: "No internet, Please check your network connection!",
    arr: "لا يوجد إنترنت ، يرجى التحقق من اتصالك بالشبكة!",
  },
  "already taken": { en: "Email are already taken", ar: "البريد الإلكتروني مستخدم" },
  "email is not confirmed": {
    en: "(01) Your account Email is not confirmed and therefore you can not sign in if you don't confirm your Email address. a new confirmation Email will be sent to your Email address. please check your Email inbox",
    ar: "(01) البريد الإلكتروني لحسابك لم يتم تأكيده، وبالتالي لا يمكنك تسجيل الدخول إذا لم تؤكد عنوان بريدك الإلكتروني. سيتم إرسال بريد إلكتروني جديد إلى عنوان بريدك الإلكتروني للتأكيد عنوان بريدك الإلكتروني. يرجى التحقق من صندوق البريد الإلكتروني الخاص بك",
  },
  "invalid identifier": {
    en: "Invalid Email or Password",
    ar: "البريد الإلكتروني أو كلمة السر خاطئة",
  },
  phoneExist: {
    en: "Phone number is already in use",
    ar: "رقم الهاتف قيد الاستخدام",
  },
  "incorrect code": {
    en: "Invalid recovery link, the link has been already used",
    ar: "رابط الاسترداد غير صالح ، لقد تم استخدام الرابط بالفعل",
  },
  "passwords do not match": {
    en: "Passwords do not match",
    ar: "كلمة المرور غير مطابقة",
  },
  "current password is invalid": {
    en: "Current password is invalid",
    ar: "كلمة المرور الحالية غير صحيحة",
  },
  "stores limit": {
    en: "You have reached the maximum stores limit",
    ar: "لقد وصلت إلى الحد الأقصى المسموح به للمخازن",
  },
  "many products": {
    en: "The number of the products is higher then the plan limit, please delete some products and then try again",
    ar: "عدد المنتجات أعلى من حد الاشتراك، يرجى حذف بعض المنتجات ثم المحاولة مرة أخرى",
  },
  "no attached payment": {
    en: "You don't have a payment method yet, please add a payment method first",
    ar: "ليس لديك طريقة دفع حتى الآن، يُرجى إضافة طريقة دفع أولاً",
  },
};
