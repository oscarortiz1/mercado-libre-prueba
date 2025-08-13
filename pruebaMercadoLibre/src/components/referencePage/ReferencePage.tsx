import { useState, useEffect } from "react";
import "./ReferencePage.css";
import { useUser } from "../../contexts/userContext";
import CountrySelect from "../selectCountries/CountrySelect";
import { useT } from "../../i18n/useT";

export default function ReferencePage() {
   const { t } = useT();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    pais: "",
    direccion: "",
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

    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";

    if (!form.correo.trim()) {
      e.correo = "Requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      e.correo = "Email inválido";
    }

    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.pais.trim()) e.pais = "Requerido";
    if (!form.direccion.trim()) e.direccion = "Requerido";

    return e;
  }

  function onSubmit(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      alert("Formulario válido ✔");
      console.log(form);
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
          className={`control ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.nombre && <p className="text-xs text-red-600 mt-1">{errors.nombre}</p>}

        <input
          name="apellido"
          placeholder={t("ph.surname")}
          value={form.apellido}
          onChange={onChange}
          className={`control ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.apellido && <p className="text-xs text-red-600 mt-1">{errors.apellido}</p>}

        <input
          name="correo"
          type="email"
          placeholder={t("ph.email")}
          value={form.correo}
          onChange={onChange}
          className={`control ${errors.correo ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.correo && <p className="text-xs text-red-600 mt-1">{errors.correo}</p>}

        <input
          name="telefono"
          placeholder={t("ph.phone")}
          value={form.telefono}
          onChange={onChange}
          className={`control ${errors.telefono ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.telefono && <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>}

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
          className={`control ${errors.direccion ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.direccion && <p className="text-xs text-red-600 mt-1">{errors.direccion}</p>}

        <div className="btn-row">
          <button type="button" className="btn btn--red">{t("action.back")}</button>
          <button type="submit" className="btn btn--blue">{t("action.update")}</button>
        </div>
      </form>
    </section>
  );
}
