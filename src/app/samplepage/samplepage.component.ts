import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GroupReport } from '../DTO/groupReports';
import { FormsModule } from '@angular/forms';
import { report } from '../DTO/report';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-samplepage',
  standalone: true,
  imports: [RouterLink,RouterOutlet,HeaderComponent,CommonModule,FormsModule],
  templateUrl: './samplepage.component.html',
  styleUrl: './samplepage.component.css'
})
export class SamplepageComponent implements OnInit {
  submenuVisible1: boolean = false;
  submenuVisible2: boolean = false;
  manhom: string | undefined ;
  ghichu: number | undefined;
  tennhom: string | undefined;
  password: string = '';
  groupReport : GroupReport[] = [];

  toggleSubMenu1() {
    this.submenuVisible1 = !this.submenuVisible1;
  }
  toggleSubMenu2() {
    this.submenuVisible2 = !this.submenuVisible2;
  }
  constructor(private report : ReportService ){}
  ngOnInit(): void {
     this.report.GetReportdataForm().subscribe(
      res =>{
        this.groupReport = res;
      }
     );
     
  }

  public selectedReport?: report = {"maNhom":"","tenNhom":"","ghichu": 0}
  SelectedItem (report : report):void{
    this.selectedReport = report;
    this.manhom = this.selectedReport.maNhom
    this.tennhom = this.selectedReport.tenNhom
    this.ghichu = this.selectedReport.ghichu
    console.log(this.selectedReport)
  }
  sayhelo(): void{
    console.log("helo")
  }

}
