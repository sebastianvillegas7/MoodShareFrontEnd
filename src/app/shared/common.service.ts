import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  headers: HttpHeaders;

  constructor(private cookieService: CookieService) {
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : `Bearer ${localStorage.getItem('token')}`
    });

    // console.log(this.cookieService.get('token'));
   }

  public static divideEvenly(numerator: number, minPartSize: number): number[] {
    if (numerator / minPartSize < 2) {
      return [numerator];
    }
    return [minPartSize].concat(this.divideEvenly(numerator - minPartSize, minPartSize));
  }

  public static divideCurrencyEvenly(numerator: number, divisor: number): number[] {
    const minPartSize: number = +(numerator / divisor).toFixed(2);
    return this.divideEvenly(numerator * 100, minPartSize * 100).map(v => {
      return parseFloat((v / 100).toFixed(2));
    });
  }

  // devuelve la fecha en formato YYYY-MM-DD (string) teniendo en cuenta el UTC para las zonas horarias
  public static fechaFormateada(inputDeFecha: Date): string {
    return new Date(new Date(inputDeFecha).getTime() - (new Date(inputDeFecha).getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
  }

  public static fill = (n: number, x: any): any[] =>
    Array(n).fill(x)

  public static concat = (xs: any[], ys: any[]): any[] =>
    xs.concat(ys)

  public static quotrem = (n: number, d: number): [number, number] =>
    [Math.floor(n / d)
      , Math.floor(n % d
        )
    ]

  public static distribute = (p: number, d: number, n: number): number[] => {
    const e =
      Math.pow(10, p);

    const [q, r] =
      CommonService.quotrem(n * e, d);

    return CommonService.concat
      (CommonService.fill(r, (q + 1) / e)
        , CommonService.fill(d - r, q / e)
      );
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  base64toPDF(data: string, id: string): void {
    const bufferArray = this.base64ToArrayBuffer(data);
    const blobStore = new Blob([bufferArray], { type: 'application/pdf' });
    //@ts-ignore
    window.navigator.msSaveOrOpenBlob(blobStore, `${id}.pdf`);
    return;
  }

  base64ToArrayBuffer(data: any) {
      const bString = window.atob(data);
      const bLength = bString.length;
      const bytes = new Uint8Array(bLength);
      for (let i = 0; i < bLength; i++) {
          const ascii = bString.charCodeAt(i);
          bytes[i] = ascii;
      }
      return bytes;
  }

  fechaFormateada(inputDeFecha: any) {
    if (inputDeFecha) {
      return new Date(new Date(inputDeFecha).getTime() - (new Date(inputDeFecha).getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
    } else {
      return null;
    }
    }
}
