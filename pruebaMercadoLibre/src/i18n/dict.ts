import type { Locale } from "./locale";


type Dict = Record<string, string>;

export const MESSAGES: Record<Locale, Dict> = {
  "es-AR": {
    "title.almost": "Ya casi estamos listos",
    "title.update": "Actualiza tus datos",

    "ph.name": "Nombre",
    "ph.surname": "Apellido",
    "ph.email": "Correo",
    "ph.phone": "Teléfono",
    "ph.country": "Seleccione un país...",
    "ph.address": "Dirección",
    "ph.captcha": "No soy un robot",

    "error.required": "Requerido",
    "error.emailInvalid": "Email inválido",

    "action.back": "Atrás",
    "action.update": "Actualizar",
    "action.captcha": "Token generado ✓",
    "action.pending": "Pendiente",
    "action.form": "Formulario válido ✔"
  },

  "pt-BR": {
    "title.almost": "Quase lá",
    "title.update": "Atualize seus dados",

    "ph.name": "Nome",
    "ph.surname": "Sobrenome",
    "ph.email": "E-mail",
    "ph.phone": "Telefone",
    "ph.country": "Selecione um país...",
    "ph.address": "Endereço",
    "ph.captcha": "Não sou um robô",

    "error.required": "Obrigatório",
    "error.emailInvalid": "E-mail inválido",

    "action.back": "Voltar",
    "action.update": "Atualizar",
    "action.captcha": "Token gerado ✓",
    "action.pending": "Pendente",
    "action.form": "Formulário válido ✔"
  },
};
