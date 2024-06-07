import { CommonModule } from '@angular/common';
import { Query } from '../../DTO/query';
import { QueryService } from './../../service/query.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-query',
  standalone: true,
  imports: [MatInputModule , MatButtonModule, FormsModule, NgIf],
  templateUrl: './add-query.component.html',
  styleUrl: './add-query.component.css'
})
export class AddQueryComponent {
  @Output() queryAdded = new EventEmitter<void>();

  newQuery: Query = {
    connectionId: '',
    queryId: '',
    queryName: '',
    sql: '',
    inputSample: ''
  };

  constructor(private queryService: QueryService) {}

  addQuery(): void {
    this.queryService.createQuery(this.newQuery).subscribe(() => {
      this.queryAdded.emit();
      this.newQuery = {
        connectionId: '',
        queryId: '',
        queryName: '',
        sql: '',
        inputSample: ''
      };
    });
  }
  onCancel(): void {
    this.queryAdded.emit();
  } 
}
