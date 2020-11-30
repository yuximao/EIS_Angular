import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class AdminService {
  constructor(private hc: HttpClient) {
  }
  users = [];
  getAllUser(): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/users`,
      {withCredentials: true}
    );
  }
  deleteUser(id): Observable<any> {
    return this.hc.delete<any>(
      `${environment.API_URL}/users/${id}`,
      {withCredentials: true}
    );
  }
  updateUser(u): Observable<any> {
    return this.hc.put<any>(
      `${environment.API_URL}/users`,
      u,
      {withCredentials: true}
    );
  }
  getHistory(id): Observable<any> {
    return this.hc.get<any>(
      `${environment.API_URL}/history/${id}`,
      {withCredentials: true}
    );
  }
}
