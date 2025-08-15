import type { Locale } from "./locale";


type Dict = Record<string, string>;

export const MESSAGES: Record<Locale, Dict> = {
  "es-AR": {
    "title.almost": "Ya casi estamos listos",
    "title.update": "Actualiza tus datos",
    "title.next": "Siguiente página",
    "title.referrer": "Referrer:",
    "title.token": "Token:",
    "title.missingParams": "Faltan parámetros de búsqueda",
    "title.home": "Página de inicio",

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
    "action.form": "Formulario válido ✔",
    "action.continue": "Continuar"
  },

  "pt-BR": {
    "title.almost": "Quase lá",
    "title.update": "Atualize seus dados",
    "title.next": "Próxima página",
    "title.referrer": "Referenciador:",
    "title.token": "Token:",
    "title.missingParams": "Faltam parâmetros de busca",
    "title.home": "Página inicial",

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
    "action.form": "Formulário válido ✔",
    "action.continue": "Continuar"
  },
};
