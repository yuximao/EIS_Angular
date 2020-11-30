import {CanLoad, Route, UrlSegment} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './shared/services/authService';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!!this.auth.user) {
      if (this.auth.role === 2) {
        console.log('isAdmin');
        return true;
      } else {
        console.log('noAdmin');
        return false; }
    }
  }


}
