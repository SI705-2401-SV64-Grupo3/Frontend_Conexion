import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Conversacion } from '../../../models/conversacion';
import { ConversacionService } from '../../../services/conversacion.service';

@Component({
  selector: 'app-listarconversacion',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarconversacion.component.html',
  styleUrl: './listarconversacion.component.css'
})
export class ListarconversacionComponent {
  dataSource: MatTableDataSource<Conversacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS:ConversacionService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
