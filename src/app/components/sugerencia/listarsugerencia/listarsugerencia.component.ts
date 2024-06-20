import { Component,OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sugerencia } from '../../../models/sugerencia';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SugerenciaService } from '../../../services/sugerencia.service';

@Component({
  selector: 'app-listarsugerencia',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarsugerencia.component.html',
  styleUrl: './listarsugerencia.component.css'
})
export class ListarsugerenciaComponent implements OnInit {
  dataSource: MatTableDataSource<Sugerencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS:SugerenciaService){}
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
