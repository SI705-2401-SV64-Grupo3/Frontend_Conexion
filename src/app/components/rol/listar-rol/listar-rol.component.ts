import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-rol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink],
  templateUrl: './listar-rol.component.html',
  styleUrl: './listar-rol.component.css'
})
export class ListarRolComponent implements OnInit{

  dataSource: MatTableDataSource<Role>=new MatTableDataSource();

  displayedColumns:String[] = [
    'codigo',
    'rol',
    'usuario',
    'actualizar',
    'eliminar'
    

  ];

  
  constructor(private rS: RolService){

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator;
    })
    this.rS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;  
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  } 

}
