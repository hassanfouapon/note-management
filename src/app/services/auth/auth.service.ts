import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  rootURL = `${environment.api}auth/`;
  //  private auth: AngularFireAuth to add in the constructor
  constructor(private http: HttpClient) {

  }

  login(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}signin`, userData);
  }

  signOut(data: any): Observable<any> {
    return this.http.post<any>(`${this.rootURL}logOut.php`, data);
  }
}
