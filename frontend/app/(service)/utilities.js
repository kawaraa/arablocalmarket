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
