import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Query } from '../../DTO/query';
import { QueryService } from './../../service/query.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConnectService } from '../../service/connect.service';
import { Connect } from '../../DTO/connect';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-query',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, NgIf, MatSelectModule, MatOptionModule, CommonModule],
  templateUrl: './edit-query.component.html',
  styleUrls: ['./edit-query.component.css']
})
export class EditQueryComponent implements OnInit {
  @Output() queryUpdated = new EventEmitter<void>();

  editQuery: Query;

  connects: Connect[] = [];

  constructor(
    private queryService: QueryService,
    private connectService: ConnectService,
    @Inject(MAT_DIALOG_DATA) public data: { query: Query }
  ) {
    this.editQuery = data.query;
  }

  ngOnInit(): void {
    this.getAllConnections();
  }

  getAllConnections(): void {
    this.connectService.getAllConnects().subscribe(connects => {
      this.connects = connects;
    });
  }

  updateQuery(): void {
    this.queryService.updateQuery(this.editQuery).subscribe(() => {
      this.queryUpdated.emit();
    });
  }

  onCancel(): void {
    this.queryUpdated.emit();
  }
}
