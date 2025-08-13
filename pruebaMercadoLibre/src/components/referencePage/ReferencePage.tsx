import { useState } from "react";
import "./ReferencePage.css";

export default function ReferencePage() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    pais: "",
    direccion: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          <h1 className="text-xl font-semibold">Ya Casi estamos listos</h1>
          <h1 className="text-xl font-semibold">Actualiza tus datos</h1>
        </header>
        <div>
          <input
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={onChange}
            required
            className={`w-full h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="given-name"
          />
          {errors.nombre && (
            <p className="text-xs text-red-600 mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <input
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={onChange}
            required
            className={`w-full h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.apellido ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="family-name"
          />
          {errors.apellido && (
            <p className="text-xs text-red-600 mt-1">{errors.apellido}</p>
          )}
        </div>

        <div>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={onChange}
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            className={`w-full h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.correo ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="email"
            inputMode="email"
          />
          {errors.correo && (
            <p className="text-xs text-red-600 mt-1">{errors.correo}</p>
          )}
        </div>

        <div>
          <input
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={onChange}
            required
            className={`w-full h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.telefono ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.telefono && (
            <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>
          )}
        </div>

        <div>
          <select
            id="pais"
            name="pais"
            value={form.pais}
            onChange={onChange}
            required
            className={`s-full h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.pais ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value=""> País </option>
            <option value="AR">Argentina</option>
          </select>
          {errors.pais && (
            <p className="text-xs text-red-600 mt-1">{errors.pais}</p>
          )}
        </div>

        <div>
          <input
            id="direccion"
            name="direccion"
            value={form.direccion}
            placeholder="Dirección"
            onChange={onChange}
            required
            className={`w-full h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.direccion ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="street-address"
          />
          {errors.direccion && (
            <p className="text-xs text-red-600 mt-1">{errors.direccion}</p>
          )}
        </div>

        <div className="btn-row">
          <button
            type="button"
            className="w-full h-11 rounded-xl border border-red-500 text-red-600"
            onClick={() => history.back()}
          >
            Atrás
          </button>

          <button
            type="submit"
            className="w-full h-11 rounded-xl border border-blue-600 text-blue-600"
          >
            Actualizar
          </button>
        </div>
      </form>
    </section>
  );
}
