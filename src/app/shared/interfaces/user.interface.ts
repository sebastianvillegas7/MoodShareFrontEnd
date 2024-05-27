export interface User {
  id_usuario?: number;
  name: string;
  apellido: string;
  email: string;
  password: string;
  roles?: any[];
  token_sesion?: string | null;
  // lista_fav: string | null;
}
