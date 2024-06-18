import { QueryService } from './../service/query.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../header/header.component';
import { Query } from '../DTO/query';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
})
export class DataListComponent implements OnInit {
  selectedQueryId: String | undefined; // Thêm thuộc tính này
  selectedQuery?: Query;
  querys: Query[]=[];
  constructor(private queryService: QueryService ){}

  ngOnInit(): void {
    this.getAllQuerys()     
  }

  getAllQuerys(): void {
    this.queryService.getAllQuerys().subscribe(querys => {
      this.querys = querys;
    });
  }
 
}

