// import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
// import { Observable, tap } from "rxjs";
// import { AuthService } from '../services/auth.service';
// import { inject } from "@angular/core";

// const checkAuthStatus = ():Observable<boolean> => {
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   return authService.checkAuthentication()
//     .pipe(
//       tap( isAutheticated => console.log('Authenticated:', isAutheticated)),
//       tap(
//         isAutheticated => {
//           if (!isAutheticated){
//             router.navigate(['auth/login'])
//           }
//         }
//       )
//     )
// }

// export const canMatchGuard: CanMatchFn = (
//     route: Route,
//     segments: UrlSegment[]
// ) => {
//     console.log('CanMatch');
//     console.log({route, segments});

//     return checkAuthStatus();
// }
// export const canActivateGuard: CanActivateFn = (
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ) => {
//         console.log('CanActivate');
//         console.log({route,state});

//         return checkAuthStatus();
//     }




import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['auth/login']);
    }
    return response;
  }
}
