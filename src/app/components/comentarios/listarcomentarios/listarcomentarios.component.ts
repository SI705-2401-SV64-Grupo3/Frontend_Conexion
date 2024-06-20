import { Component, OnInit, ViewChild } from '@angular/core';
import { Comentario } from '../../../models/comentario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ComentarioService } from '../../../services/comentario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarcomentarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './listarcomentarios.component.html',
  styleUrl: './listarcomentarios.component.css'
})
export class ListarcomentariosComponent implements OnInit {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'accion01'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ComentarioService) { }
  
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
  
  eliminar(id: number) {
    this.cS.eliminar(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  } 
}
