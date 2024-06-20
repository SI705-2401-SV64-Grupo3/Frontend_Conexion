import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recordatorio } from '../../../models/recordatorio';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RecordatorioService } from '../../../services/recordatorio.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarrecordatorio',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,MatIconModule,RouterLink,MatButtonModule
  ],
  templateUrl: './listarrecordatorio.component.html',
  styleUrl: './listarrecordatorio.component.css'
})
export class ListarrecordatorioComponent implements OnInit {
  dataSource: MatTableDataSource<Recordatorio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RecordatorioService) { }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
