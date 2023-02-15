import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClasseService{

    rootURL = `${environment.api}classe/`;
    rootRelationURL1 = `${environment.api}specialite/`;
    rootRelationURL2 = `${environment.api}niveau/`;
    rootRelationURL3 = `${environment.api}semestre/`;
    constructor(private http: HttpClient){};
    
    getNiveaux(): Observable<any>{
      return this.http.get(`${this.rootRelationURL2}`);
    }

    getSemestre(): Observable<any>{
        return this.http.get(`${this.rootRelationURL3}`);
    }
    
    getSpecialites(): Observable<any>{
      return this.http.get(`${this.rootRelationURL1}`);
    }

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