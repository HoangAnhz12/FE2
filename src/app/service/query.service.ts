

import { Connect } from './../DTO/connect';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '../DTO/query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private baseUrl='http://localhost:8080/query'
  constructor(private http: HttpClient){}

  getAllQuerys(): Observable<Query[]>{
    return this.http.get<Query[]>(`${this.baseUrl}/findAll`);
  }
  createQuery(query:Query ): Observable<Query>{
    return this.http.post<Query>(`${this.baseUrl}/addQuery`,query);
  }
  updateQuery( query:Query): Observable<Query>{
    return this.http.put<Query>(`${this.baseUrl}/updateQuery/${query.queryId}`,query);
  }
  deleteQuery(id ?:string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteQuery/${id}`);
  }
}
