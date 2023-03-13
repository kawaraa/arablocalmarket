export default class Cookies {
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
