export interface User {
  id_usuario?: number;
  name: string;
  apellido: string;
  email: string;
  password: string;
  roles?: string[];
  token_sesion?: string | null;
  // lista_fav: string | null;
}
