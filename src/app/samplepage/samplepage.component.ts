
import { ReportService } from './../service/report.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GroupReport } from '../DTO/groupReports';
import { FormsModule } from '@angular/forms';
import { report } from '../DTO/report';
import { group } from 'console';

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
  selectedGroupId: number | undefined; // Thêm thuộc tính này
  selectedGroup?: GroupReport;
  isEditing: boolean=false;
  isEditing1: boolean=false;
  isEditMode: boolean = false;
  openIndex: number | null = null;

  toggleMenu(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  constructor(private reportService : ReportService ){}
  ngOnInit(): void {
     this.reportService.GetReportdataForm().subscribe(
      res =>{
        this.groupReport = res;
      }
     );
     
  }
  disable(): void {
    this.isEditing=true;
    this.isEditing1=true;
  }
  resetForm(): void {
    this.selectedReport = { maNhom: '', tenNhom: '', ghichu: 0, };
    this.isEditing=false;
    this.manhom = '';
    this.tennhom = '';
    this.ghichu = undefined;
  }

  public selectedReport?: report = {"maNhom":"","tenNhom":"","ghichu": 0}
  SelectedItem (report : report):void{
    this.selectedReport = report;
    this.disable();
    this.manhom = this.selectedReport.maNhom
    this.tennhom = this.selectedReport.tenNhom
    this.ghichu = this.selectedReport.ghichu
    this.selectedGroup = this.groupReport.find(group => group.reports?.some(r => r.maNhom === report.maNhom));
    if (this.selectedGroup) {
      this.selectedGroupId = this.selectedGroup.id;
    }
    console.log(this.selectedReport)
  }
  sayhelo(): void{
    console.log("helo")
  }
  isReportSelected(): boolean {
    return this.selectedReport !== undefined && this.selectedReport.maNhom !== '';
  }
  enable():void{
    this.isEditing1=true;
    this.isReportSelected;
    this.isEditing=false;
  }
  

  createReport(): void {
    if (this.selectedGroupId !== undefined) { // Check if selectedGroupId is defined
        const newReport: report = {
            maNhom: this.manhom  ,
            tenNhom: this.tennhom  ,
            ghichu: this.ghichu || 0
        };
        this.reportService.createGroupReport(this.selectedGroupId, newReport).subscribe(() => {
            this.ngOnInit();
            this.resetForm();
        }, error => {
            console.error('Error resert:', error);
        });
    } else {
        console.error('Group ID is not selected');
    }
}
//
updateReport(): void {
  if (this.selectedReport?.maNhom && this.selectedGroupId !== undefined) {
    const updatedReport: report = {
      maNhom: this.manhom ,
      tenNhom: this.tennhom ,
      ghichu: this.ghichu || 0
    };
    this.reportService.updateGroupReport(this.selectedGroupId,this.selectedReport.maNhom,updatedReport).subscribe(
      () => {
        console.log('Report updated successfully');
        this.ngOnInit();
        this.resetForm();
      },
      error => {
        console.error('Error updating report:', error);
      }
    );
  } else {
    console.error('Selected report does not have valid group or report ID');
  }
}

deleteReport(): void {
  if (this.selectedReport?.maNhom && this.selectedGroupId !== undefined) {
    this.reportService.deleteGroupReport(this.selectedGroupId,this.selectedReport.maNhom).subscribe(
      () => {
        this.ngOnInit();
        this.resetForm();
      },
      error => {
        console.error('Error deleting report:', error);
      }
    );
  } else {
    console.error('Selected report does not have valid group or report ID');
  }
}


}
