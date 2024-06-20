import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recursoeducativo } from '../../../models/recursoeducativo';
import { RecursoeducativoService } from '../../../services/recursoeducativo.service';

@Component({
  selector: 'app-listarrecurso',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarrecurso.component.html',
  styleUrl: './listarrecurso.component.css'
})
export class ListarrecursoComponent implements OnInit {
  dataSource: MatTableDataSource<Recursoeducativo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reS:RecursoeducativoService){}
  ngOnInit(): void {
    this.reS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.reS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
