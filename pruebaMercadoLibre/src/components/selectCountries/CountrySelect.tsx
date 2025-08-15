import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { getCountry } from "../../services/services";
import type { Country } from "../../types/country.type";
import "./CountrySelect.css";
import { useT } from "../../i18n/useT";

type Option = { value: string; label: string; _id: string };

const CACHE_KEY = "country_cache";
const CACHE_TTL = 1000 * 60 * 60 * 24;

function getCachedCountries(): Country[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const { data, exp } = JSON.parse(raw);
    if (Date.now() > exp) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCachedCountries(data: Country[]) {
  try {
    const payload = {
      data,
      exp: Date.now() + CACHE_TTL,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
  }
}

export default function CountrySelect({
  value,
  onChange,
  initialId = "",
  error,
  placeholder = "Seleccione un país...",
}: {
  value: string;
  onChange: (opt: { value: string; label: string } | null) => void;
  initialId?: string;
  error?: string;
  placeholder?: string;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const didPrefill = useRef(false);
  const { t } = useT();
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    (async () => {
      try {
        const cached = getCachedCountries();
        if (cached) {
          setCountries(cached);
          return;
        }

        const data: Country[] = await getCountry();
        setCountries(data);
        setCachedCountries(data); // Guardar en caché
      } catch (err) {
        console.error("Error al cargar países:", err);
      }
    })();
  }, []);

  const options: Option[] = countries.map((c) => ({
    value: c.name,
    label: c.name,
    _id: c.id,
  }));

  useEffect(() => {
    if (didPrefill.current) return;
    if (!initialId) return;
    if (!options.length) return;
    if (value && value.trim() !== "") return;

    const found = options.find((o) => o._id === initialId);
    if (found) {
      onChange({ value: found.value, label: found.label });
      didPrefill.current = true;
    }
  }, [options, initialId, value, onChange]);

  const selected = value
    ? options.find((o) => o.value === value) || null
    : null;

  const showError = Boolean(error);

  return (
    <div className={`w-full ${showError ? "has-error" : ""}`}>
      <Select
        className="react-select w-full"
        classNamePrefix="rs"
        options={options}
        value={selected}
        onChange={(opt) => onChange(opt ?? null)}
        placeholder={placeholder}
        inputId="country-select"
        aria-invalid={showError}
        isClearable
      />
      {showError && (
        <p id="country-select-error" className="field-error">
          {t("error.required")}
        </p>
      )}
    </div>
  );
}
