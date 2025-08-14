import React, { useEffect, useState } from "react";
import "./CaptchaMock.css";
import { useT } from "../../i18n/useT";
function genToken(len = 32) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function CaptchaMock({
  value,
  onChange,
  name = "captcha_token",
  error,
}: {
  value: string | null | undefined;
  onChange: (token: string | null) => void;
  name?: string;
  required?: boolean;
  error?: string;
  label?: string;
}) {
  const [checked, setChecked] = useState(Boolean(value));
  const { t } = useT();

  useEffect(() => {
    setChecked(Boolean(value));
  }, [value]);

  function toggle(e: React.ChangeEvent<HTMLInputElement>) {
    const c = e.target.checked;
    setChecked(c);
    if (c) onChange(genToken());
    else onChange(null);
  }

  const showError = Boolean(error);

  return (
    <div className={`captcha ${showError ? "has-error" : ""}`}>
      <label className="captcha__box">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggle}
          aria-invalid={showError}
          aria-describedby={showError ? "captcha-error" : undefined}
        />
        <span className="captcha__label">{t("ph.captcha")}</span>
      </label>

      <input type="hidden" name={name} value={value || ""} />

      <div className="captcha__status">
        {checked && value ? t("action.captcha") : t("action.pending")}
      </div>

      {showError && (
        <p id="captcha-error" className="field-error">
          {t("error.required")}
        </p>
      )}
    </div>
  );
}
