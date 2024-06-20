import { Component, OnInit,ViewChild } from '@angular/core';
import { Meta } from '../../../models/meta';
import { MetaService } from '../../../services/meta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarmeta',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarmeta.component.html',
  styleUrl: './listarmeta.component.css'
})
export class ListarmetaComponent implements OnInit {
  dataSource: MatTableDataSource<Meta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS:MetaService){}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
