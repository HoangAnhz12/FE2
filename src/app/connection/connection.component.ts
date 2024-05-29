import { CommonModule } from '@angular/common';
import { ConnectService } from './../service/connect.service';
import { Connect } from './../DTO/connect';
import { Component, OnInit, afterRender } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { connect } from 'http2';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit {
  connects: Connect[] = [];  // Danh sách kết nối
  MaKN: string| undefined;
  TenKN:string|undefined;
  URL:string |undefined;
  User:string |undefined;
  Password:string| undefined;
  isEditing: boolean=false;
  isEditing1:boolean=false;
  newConnect: Connect = { MaKN: '', TenKN: '', URL: '', User: '', Password: '' };  // Biến để thêm hoặc chỉnh sửa kết nối
  isEditMode: boolean = false;  // Kiểm tra chế độ chỉnh sửa
  Notifitions: string ="";
  selectedIndex: number | null = null;

  constructor(private connectService: ConnectService) { }

  ngOnInit(): void {
    this.getAllConnects();
  }
  public selectedConnect?: Connect = {"MaKN":"","TenKN":"","URL": "","User":"","Password":""}
  public selectedConnect_2?: Connect = this.selectedConnect;
  SelectedItem (connect: Connect, index: number):void{
    this.selectedConnect =connect;
    this.selectedIndex = index;
    this.MaKN = this.selectedConnect.MaKN
    this.TenKN = this.selectedConnect.TenKN
    this.URL = this.selectedConnect.URL
    this.User= this.selectedConnect.User
    this.Password= this.selectedConnect.Password

  }

  getAllConnects(): void {
    this.connectService.getAllConnects().subscribe(connects => this.connects = connects);
  }

  createConnect(): void {

    // if (this.newConnect.MaKN && this.newConnect.TenKN) {
    //   this.connectService.createConnect(this.newConnect).subscribe(connect => {
    //     this.connects.push(connect);
    //     this.resetForm();
    //   });
    // } else {
    //   console.error('MaKN and TenKN are required');
    // }
    if (this.MaKN && this.TenKN){
      this.newConnect = {MaKN :this.MaKN,TenKN:this.TenKN,URL:this.URL,User:this.User,Password:this.Password}
      this.connectService.createConnect(this.newConnect).subscribe(()=>{
        this.getAllConnects();
        this.resetForm();
      })
    }
  }

  updateConnect(): void {
    if (this.MaKN){
      this.newConnect = {MaKN :this.MaKN,TenKN:this.TenKN,URL:this.URL,User:this.User,Password:this.Password}
      console.log(this.newConnect)
      this.connectService.updateConnect(this.MaKN,this.newConnect).subscribe(res=>{
        this.getAllConnects();
        this.resetForm();
        alert(res)
      })
    }
  }

  deleteConnect(id: string): void {
    this.connectService.deleteConnect(id).subscribe(() => {
      this.resetForm();
      this.getAllConnects();
    });
  }
  deleteConnect_ID(): void {
    this.connectService.deleteConnect(this.MaKN).subscribe(() => {
      this.getAllConnects();
    });
  }
  resetForm(): void {
    this.selectedConnect = { MaKN: '', TenKN: '', URL: '',User:'',Password:'' };
    this.MaKN =""
    this.TenKN=""
    this.URL ="",
    this.User="",
    this.Password="" 
    console.log('đã nhấn hủy');
    this.isEditing=false;
    this.isEditMode=false;
    this.isEditing1=false;
  }
  checkConnection (): void{
      this.connectService.CheckConnection(this.URL).subscribe(res => {
        alert(res.message)
      });
  }
  showData():void {
    alert(`${this.MaKN},${this.TenKN},${this.URL},${this.User},${this.Password},`)
  }
  disable(): void {
    this.isEditing=true;
    this.isEditing1=true;
  }
  isReportSelected(): boolean {
    return this.selectedConnect !==undefined && this.selectedConnect.MaKN !=='';
  }
  enable():void{
    this.isEditing1=true;
    this.isReportSelected;
    this.isEditing=false;
    this.isEditMode = true;
  }
 

}
  
