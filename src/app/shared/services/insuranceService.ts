import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ObjectUnsubscribedError, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Insurance} from '../models/insurance';

@Injectable()
export class InsuranceService {
  constructor(private hc: HttpClient) {
  }
  insurance: any;
  claim: any;
  getInsurance(id): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/insurance/${id}`,
      {withCredentials: true}
    );
  }
  addInsurance(i): Observable<any> {
    return this.hc.post<any>(
      `${environment.API_URL}/insurance`,
      i,
      {withCredentials: true}
    );
  }
  updateInsurance(i): Observable<any> {
    return this.hc.put<any>(
      `${environment.API_URL}/insurance`,
      i,
      {withCredentials: true}
    );
  }
  getAllInsurance(): Observable<Insurance[]> {
    return this.hc.get<Insurance[]>(
      `${environment.API_URL}/insurance`,
      {withCredentials: true}
    );
  }

  getClaim(InsId): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/claim/insur/${InsId}`,
      {withCredentials: true}
    );
  }
  getClaimByUser(uid): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/claim/${uid}`,
      {withCredentials: true}
    );
  }
  newClaim(c): Observable<any> {
    return this.hc.post<any>(
      `${environment.API_URL}/claim`,
      c,
      {withCredentials: true}
      );
  }
  addHistory(h): Observable<any> {
    return this.hc.post<any>(
      `${environment.API_URL}/history`,
      h,
      {withCredentials: true}
    );
  }
}
