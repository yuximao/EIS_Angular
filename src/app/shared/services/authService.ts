import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Car} from '../models/car';

@Injectable()
export class AuthService {
  constructor(private hc: HttpClient) {
  }
  user = null;
  uid: number;
  role: number;
  profile: any;
  psw: any;
  login(user): Observable<any> {
    const userData = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.hc.post<any>(
      `${environment.API_URL}/login`,
      userData,
      {withCredentials: true});
  }

  logout(): Observable<{success: boolean}> {
    return this.hc.post<{success: boolean}>(
      `${environment.API_URL}/logout`,
      {withCredentials: true});
  }

  getUser(): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/checklogin`,
      {withCredentials: true}
    );
  }
  // @ts-ignore
  newUser(user): Observable<any> {
    return this.hc.post<any>(
      `${environment.API_URL}/users`,
      user,
      {withCredentials: true});

  }
  getCar(id): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/car/${id}`,
      {withCredentials: true}
    );
  }
  updateCar(car): Observable<any> {
   return this.hc.put<any>(
     `${environment.API_URL}/car`,
     car,
     {withCredentials: true}
   );
  }
  // addCar(car): Observable<{car: Car, success: boolean}> {
  //   console.log(car.insurance);
  //   return this.hc.post<{car: Car, success: boolean}>(
  //     `${environment.API_URL}/car`,
  //     car,
  //     {withCredentials: true}
  //   );
  // }
  getProfile(id): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/profile/${id}`,
      {withCredentials: true}
    );
  }
  updateProfile(p): Observable<any> {
    return this.hc.put<any>(
      `${environment.API_URL}/profile`,
      p,
      {withCredentials: true}
    );
  }
  addProfile(p): Observable<any> {
    return this.hc.post<any>(
      `${environment.API_URL}/profile`,
      p,
      {withCredentials: true}
    );
  }

  getAllProfile(): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/profile`,
      {withCredentials: true}
    );
  }
}
