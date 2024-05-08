// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// API SGE PARA LOGIN
export const URL_BASE_SGE = 'http://143.47.48.255/dev';
export const URL_API_SGE = `${URL_BASE_SGE}/api/private`;

// API PARA MOVIES
export const URL_API_MOVIES = 'https://api.themoviedb.org/3/';
export const TOKEN_API_MOVIES = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmMwMWQxZGJhNTM4OWJjZjI5MDUzMzc0ZWNiZDUxZCIsInN1YiI6IjY1Yzc1MGUyNTRhMDk4MDE4NDAxOWJkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPpDboS8MDXxdvnDizQXZ_IiHAc72Ekvi65X9nAhifc';

// Cabeceras para las solicitudes HTTP a la API de películas
export const MOVIES_API_HEADERS = {
  headers: {
    'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
    'accept': 'application/json'
  }
};
