import { report } from './../DTO/report';
import { GroupReport } from './../DTO/groupReports';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { url } from 'inspector';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/Report';
  constructor(private http: HttpClient) { }
  GetReportdataForm(): Observable<GroupReport[]>{
    return this.http.get<GroupReport[]>(`${this.baseUrl}/findAll`);
  }

  createGroupReport(Id: number, report: report): Observable<report> {
    return this.http.post<report>(`${this.baseUrl}/addReport/${Id}`, report);
  }

  updateGroupReport(groupId:number,reportId : string, report:report): Observable<GroupReport> {
    return this.http.put<GroupReport>(`${this.baseUrl}/updateReport/${groupId}/${reportId}`, report);
  }

  deleteGroupReport(groupId: number, reportId : string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteReport/${groupId}/${reportId}`);
 
}
}
