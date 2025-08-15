import { useState } from "react";
import CaptchaMock from "../checkbox/CaptchaMock";
import "./HomePage.css";
import { useT } from "../../i18n/useT";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [captcha, setCaptcha] = useState({ captcha_token: "" });
  const [errors, setErrors] = useState({ captcha_token: "" });
  const { t } = useT();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "es-AR";

  const handleContinue = () => {
    if (!captcha.captcha_token) {
      setErrors({ captcha_token: "Debes completar el captcha" });
      return;
    }

    const referrer = encodeURIComponent("/previous-step");
    const token = encodeURIComponent(captcha.captcha_token);
    const url = `/step2?referrer=${referrer}&token=${token}
    &locale=${locale}`;

    window.open(url, "_self");
  };

  return (
    <div className="captcha-container">
      <h1>{t("title.home")}</h1>
      <CaptchaMock
        value={captcha.captcha_token}
        onChange={(token) =>
          setCaptcha((f: { captcha_token: string }) => ({
            ...f,
            captcha_token: token || "",
          }))
        }
        error={errors.captcha_token}
      />
      <button className="btn btn--blue" onClick={handleContinue}>
        {t("action.continue")}
      </button>
    </div>
  );
}
