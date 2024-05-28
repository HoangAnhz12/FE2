import { CommonModule } from '@angular/common';
import { ConnectService } from './../service/connect.service';
import { Connect } from './../DTO/connect';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { connect } from 'http2';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
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
  newConnect: Connect = { MaKN: '', TenKN: '', URL: '', User: '', Password: '' };  // Biến để thêm hoặc chỉnh sửa kết nối
  isEditMode: boolean = false;  // Kiểm tra chế độ chỉnh sửa

  constructor(private connectService: ConnectService) { }

  ngOnInit(): void {
    this.getAllConnects();
  }
  public selectedConnect?: Connect = {"MaKN":"","TenKN":"","URL": "","User":"","Password":""}
  SelectedItem (connect: Connect):void{
    this.selectedConnect =connect;
    // this.disable();
    this.MaKN = this.selectedConnect.MaKN
    this.TenKN = this.selectedConnect.TenKN
    this.URL = this.selectedConnect.URL
    this.User= this.selectedConnect.User
    this.Password= this.selectedConnect.Password
    console.log(this.selectedConnect)
  }

  getAllConnects(): void {
    this.connectService.getAllConnects().subscribe(connects => this.connects = connects);
  }

  createConnect(): void {
    if (this.newConnect.MaKN && this.newConnect.TenKN) {
      this.connectService.createConnect(this.newConnect).subscribe(connect => {
        this.connects.push(connect);
        this.resetForm();
      });
    } else {
      console.error('MaKN and TenKN are required');
    }
  }

  updateConnect(): void {
    if (this.selectedConnect && this.selectedConnect.MaKN) {
      this.connectService.updateConnect(this.selectedConnect.MaKN, this.selectedConnect).subscribe(() => {
        this.getAllConnects();
        this.resetForm();
      });
    }
  }

  deleteConnect(id: string): void {
    this.connectService.deleteConnect(id).subscribe(() => {
      this.getAllConnects();
    });
  }


  resetForm(): void {
    this.newConnect = { MaKN: '', TenKN: '', URL: '', User: '', Password: '' };
    this.isEditMode = false;
  }

  
}
  
