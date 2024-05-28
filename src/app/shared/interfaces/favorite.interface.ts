export interface Favorite {
  idFav: number | string;
  idElemento: number | string;
  idUsuario: number | string;
  tipoElemento: string;
}

export enum TipoElemento {
  Artist = "artist",
  Release = "release",
  Master = "master"
}
