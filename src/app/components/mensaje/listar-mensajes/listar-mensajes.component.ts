import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mensaje } from '../../../models/mensaje';
import { MensajeService } from '../../../services/mensaje.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-mensajes',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './listar-mensajes.component.html',
  styleUrl: './listar-mensajes.component.css'
})
export class ListarMensajesComponent implements OnInit {

  dataSource: MatTableDataSource<Mensaje>=new MatTableDataSource();

  displayedColumns: String[] = [

    'codigo',
    'contenido',
    'fecha',
    'hora',
    'estado',
    'usuario',
    'actualizar',
    'eliminar',
    
    
  ];

  

  constructor(private mS:MensajeService) { }

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {

    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
    })
    this.mS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;  
  }

  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  } 

}
