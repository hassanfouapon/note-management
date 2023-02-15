import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReportService {

  rootURL = `${environment.api}report/`;
  constructor(private http: HttpClient) {}

  getFinalPv(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}PvFinal`, data);
  }

  getStudentCard(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}CarteEtudiant`, data);
  }

  getSynthexePv(data: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}PvSynthese`, data);
  }
}
