import { Connect } from './../DTO/connect';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private baseUrl='http://localhost:8080/connect'
  private baseUrl_2='http://localhost:8080/connectDB'
  constructor(private http: HttpClient) {

   }
  getAllConnects(): Observable<Connect[]>{
    return this.http.get<Connect[]>(`${this.baseUrl}/findAll`);
  }
  createConnect(connect:Connect ): Observable<Connect>{
    return this.http.post<Connect>(`${this.baseUrl}/addConnect`,connect);
  }
  updateConnect(id: string, connect: Connect):Observable<Connect>{
    return this.http.put<Connect>(`${this.baseUrl}/updateConnect/${id}`,connect);
  }
  deleteConnect(id ?:string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteConnect/${id}`);
  }
  CheckConnection(connectionStringParam?: string): Observable<any> {
    let params = new HttpParams();
    if (connectionStringParam) {
      params = params.set('connectionString', connectionStringParam);
    }
    return this.http.get<any>(`${this.baseUrl_2}/db`, { params });
  }
}
