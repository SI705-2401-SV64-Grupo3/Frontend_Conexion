import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Publicacion } from '../../../models/publicacion';
import { PublicacionService } from '../../../services/publicacion.service';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatPaginatorModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
  export class ListarComponent implements OnInit {

    displayedColumns: string[] = [
      'codigoPublicacion',
      'contenido',
      'fecha',
      'hora',
      'likes',
      'compartidos',
      'accion02'
    ];

    dataSource: MatTableDataSource<Publicacion> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private pS: PublicacionService) { }
  

    ngOnInit(): void {
      this.pS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
      })
  
      this.pS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
      })
    }

    eliminar(id: number) {
      this.pS.eliminar(id).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          //esto es para actualizar la lista
          this.pS.setList(data);
        });
      });
    } 
  }
