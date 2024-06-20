import { Component, OnInit, ViewChild } from '@angular/core';
import { Notificacion } from '../../../models/notificacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarnotificaciones',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css'
})
export class ListarnotificacionesComponent implements OnInit{
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'accion01'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private nS: NotificacionService) { }
  
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });    
  }
  
  eliminar(id: number) {
    this.nS.eliminar(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  } 
}
