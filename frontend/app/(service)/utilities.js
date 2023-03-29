export class Cookies {
  static set(name, value) {
    if (!name) value = Date.now() + value * 24 * 60 * 60 * 1000;
    document.cookie = `${name || "expires"}=;path=/;`; // Delete cookie
    document.cookie = `${name || "expires"}=${value};path=/;`; // create cookie
  }
  static get(name) {
    return Cookies.getAll()[name] || null;
  }
  static getAll() {
    return Cookies.parse(document.cookie);
  }
  static remove(name) {
    const cookies = Cookies.getAll();
    delete cookies[name];
    document.cookie = Object.keys(cookies).reduce((total, name) => total + `${name}=${cookies[name]}`, "");
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
  console.log(error);
  const lang = Cookies.get("lang") || "en";
  const name = Object.keys(errors).find((errName) => error.toLowerCase().includes(errName));
  return name ? errors[name][lang] : errors.wrong[lang];
}

const errors = {
  wrong: {
    en: "Something went wrong, please try again later",
    ar: "حدث خطأ ما، يرجى المحاولة فى وقت لاحق",
  },
  "already taken": { en: "Email are already taken", ar: "البريد الإلكتروني مستخدم" },
};
