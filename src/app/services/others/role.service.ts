import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoleService{

  rootURL = `${environment.api}role/`;
  constructor(private http: HttpClient) {}

  
  create(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}save`, data);
  }

  update(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}update`, data);
  }

  delete(data: any): Observable<any>{
    return this.http.delete<any>(`${this.rootURL}${data}`);
  }


  all(): Observable<any> {
    return this.http.get(`${this.rootURL}`);
  }

  getByCode(data: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}`, data);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}${id}`);
  }
}