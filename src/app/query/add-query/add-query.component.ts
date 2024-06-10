import { CommonModule } from '@angular/common';
import { Query } from '../../DTO/query';
import { QueryService } from './../../service/query.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConnectService } from '../../service/connect.service';
import { Connect } from '../../DTO/connect';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-query',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, NgIf, MatSelectModule,MatOptionModule,CommonModule],
  templateUrl: './add-query.component.html',
  styleUrl: './add-query.component.css'
})
export class AddQueryComponent implements OnInit {
  @Output() queryAdded = new EventEmitter<void>();
  
  newQuery: Query = {
    connectionId: '',
    queryId: '',
    queryName: '',
    sql: '',
    inputSample: ''
  };
  connects: Connect[] = [];

  constructor(private queryService: QueryService, private connectService: ConnectService) {}

  ngOnInit(): void {
    this.getAllConnections()
  }

  getAllConnections(): void {
    this.connectService.getAllConnects().subscribe(connects => {
      this.connects = connects;
    });
  }

  addQuery(): void {
    this.queryService.createQuery(this.newQuery).subscribe(() => {
      this.queryAdded.emit();
    });
  }

  onCancel(): void {
    this.queryAdded.emit();
  }
}
