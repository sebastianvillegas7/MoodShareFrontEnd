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
// export const URL_BASE_SGE = 'http://143.47.48.255/dev';
// export const URL_API_SGE = `${URL_BASE_SGE}/api/private`;

// API LAST.fm
export const URL_API_LASTFM = 'http://ws.audioscrobbler.com/2.0/';
export const API_KEY_LASTFM = '7694c5aed3f63cb53857ce738f75a4a8';


// Cabeceras para las solicitudes HTTP
export const LASTFM_API_HEADERS = {
  headers: {
    'Authorization': `Bearer ${API_KEY_LASTFM}`,
    'accept': 'application/json'
  }
};



// API DISCOGS
export const URL_API_DISCOGS = 'https://api.discogs.com/';
export const DISCOGS_KEY = 'IIXssEWDwIUalUqPACGM';
export const DISCOGS_SECRET = 'SXEKOTKEkYThmAqcuoAwwKTOvDKtlwXD';

// Cabeceras para las solicitudes HTTP
export const DISCOGS_API_HEADERS = {
  headers: {
    'Authorization': `Discogs key=${DISCOGS_KEY}, secret=${DISCOGS_SECRET}`,
    'accept': 'application/json'
  }
};
