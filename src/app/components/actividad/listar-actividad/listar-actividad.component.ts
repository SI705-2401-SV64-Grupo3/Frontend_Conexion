import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActividadService } from '../../../services/actividad.service';
import { Actividad } from '../../../models/actividad';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-listar-actividad',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './listar-actividad.component.html',
  styleUrl: './listar-actividad.component.css'
})
export class ListarActividadComponent implements OnInit {
  displayedColumns:String[] = [
    'codigo',
    'fecha',
    'duracion',
    'nombre',
    'lugar',
    'descripcion',
    'usuario1',
    'usuario2',
    'actualizar',
    'eliminar'
    

  ];

  dataSource: MatTableDataSource<Actividad>=new MatTableDataSource();
  constructor(private aS: ActividadService){

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  
  ngOnInit(): void {
    this.aS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator;
    })
    this.aS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;  
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  } 

}
