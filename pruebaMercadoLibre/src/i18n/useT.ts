import { useMemo } from "react";
import { MESSAGES } from "./dict";
import { getLocaleFromURL } from "./locale";

export function useT() {
  const locale = getLocaleFromURL();
  const dict = useMemo(() => MESSAGES[locale], [locale]);
  const t = (key: string) => dict[key] ?? key;
  return { t, locale };
}
