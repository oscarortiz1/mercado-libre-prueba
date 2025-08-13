export type Locale = "es-AR" | "pt-BR";

export function getLocaleFromURL(): Locale {
  const raw = new URLSearchParams(window.location.search).get("locale")?.trim();
  return raw === "pt-BR" || raw === "es-AR" ? raw : "es-AR";
}


export function setHtmlLang() {
  document.documentElement.lang = getLocaleFromURL();
}
