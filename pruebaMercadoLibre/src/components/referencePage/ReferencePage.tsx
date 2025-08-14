import { useState, useEffect } from "react";
import "./ReferencePage.css";
import { useUser } from "../../contexts/userContext";
import CountrySelect from "../selectCountries/CountrySelect";
import { useT } from "../../i18n/useT";
import CaptchaMock from "../checkbox/CaptchaMock";

export default function ReferencePage() {
  const { t } = useT();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    pais: "",
    direccion: "",
    captcha_token: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      nombre: user.first_name || prev.nombre,
      apellido: user.last_name || prev.apellido,
      correo: user.email || prev.correo,
      telefono: user.phone?.number || prev.telefono,
      direccion: user.address?.address || prev.direccion,
    }));
  }, [user]);

  function onChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const e: Record<string, string> = {};

    if (!form.nombre.trim()) e.nombre = t("error.required");
    if (!form.apellido.trim()) e.apellido = t("error.required");

    if (!form.correo.trim()) {
      e.correo = t("error.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      e.correo = t("error.invalid_email");
    }

    if (!form.telefono.trim()) e.telefono = t("error.required");
    if (!form.pais.trim()) e.pais = t("error.required");
    if (!form.direccion.trim()) e.direccion = t("error.required");
    if (!form.captcha_token.trim()) e.captcha_token = t("error.required");

    return e;
  }

  function onSubmit(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      alert(t("action.form"));
      console.log(form);
      const tokenCaptcha = form.captcha_token;

      const referrer = "/previous-step";

      const url = `/otra-pagina?referrer=${encodeURIComponent(
        referrer
      )}&token=${encodeURIComponent(tokenCaptcha)}`;

      window.open(url, "_blank");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow p-5 md:p-6 space-y-4"
        noValidate
      >
        <header>
          <h1 className="text-xl font-semibold">{t("title.almost")}</h1>
          <h1 className="text-xl font-semibold">{t("title.update")}</h1>
        </header>

        <input
          name="nombre"
          placeholder={t("ph.name")}
          value={form.nombre}
          onChange={onChange}
          className={`control ${
            errors.nombre ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nombre && (
          <p className="text-xs text-red-600 mt-1">{errors.nombre}</p>
        )}

        <input
          name="apellido"
          placeholder={t("ph.surname")}
          value={form.apellido}
          onChange={onChange}
          className={`control ${
            errors.apellido ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.apellido && (
          <p className="text-xs text-red-600 mt-1">{errors.apellido}</p>
        )}

        <input
          name="correo"
          type="email"
          placeholder={t("ph.email")}
          value={form.correo}
          onChange={onChange}
          className={`control ${
            errors.correo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.correo && (
          <p className="text-xs text-red-600 mt-1">{errors.correo}</p>
        )}

        <input
          name="telefono"
          placeholder={t("ph.phone")}
          value={form.telefono}
          onChange={onChange}
          className={`control ${
            errors.telefono ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.telefono && (
          <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>
        )}

        <CountrySelect
          value={form.pais}
          initialId={user?.country_id || ""}
          onChange={(opt) => setForm((f) => ({ ...f, pais: opt?.value || "" }))}
          error={errors.pais}
          placeholder={t("ph.country")}
        />

        <input
          name="direccion"
          placeholder={t("ph.address")}
          value={form.direccion}
          onChange={onChange}
          className={`control ${
            errors.direccion ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.direccion && (
          <p className="text-xs text-red-600 mt-1">{errors.direccion}</p>
        )}
        <CaptchaMock
          value={form.captcha_token}
          onChange={(token) =>
            setForm((f) => ({ ...f, captcha_token: token || "" }))
          }
          error={errors.captcha_token}
        />
        <div className="btn-row">
          <button type="button" className="btn btn--red">
            {t("action.back")}
          </button>
          <button type="submit" className="btn btn--blue">
            {t("action.update")}
          </button>
        </div>
      </form>
    </section>
  );
}
