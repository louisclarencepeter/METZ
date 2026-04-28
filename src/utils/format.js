export function telHref(phone) {
  return `tel:${phone.replace(/[^+0-9]/g, "")}`;
}
