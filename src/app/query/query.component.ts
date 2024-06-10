import { CommonModule } from '@angular/common';
import bootstrap from '../../main.server';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { AddQueryComponent } from './add-query/add-query.component';
import { Query } from '../DTO/query';
import { QueryService } from '../service/query.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditQueryComponent } from './edit-query/edit-query.component';
@Component({
  selector: 'app-query',
  standalone: true,
  imports: [HeaderComponent,CommonModule,MatDialogModule,MatButtonModule,AddQueryComponent],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent implements OnInit {
  queries: Query[] = [];

  constructor(public dialog: MatDialog,private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.getAllQuerys().subscribe((data: Query[]) => {
      this.queries = data;
    });
  }
  
  deleteQuery(id: string): void {
    this.queryService.deleteQuery(id).subscribe(() => {
      this.ngOnInit();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddQueryComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.queryAdded.subscribe(() => {
      dialogRef.close();
      this.ngOnInit();
    });
  }
  openDialogedit(query: Query): void {
    const dialogRef = this.dialog.open(EditQueryComponent, {
      width: '600px',
      data: { query }
    });

    dialogRef.componentInstance.queryUpdated.subscribe(() => {
      dialogRef.close();
      this.ngOnInit();
    });
  }
}
