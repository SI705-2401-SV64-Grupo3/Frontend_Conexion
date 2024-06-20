import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomentariosComponent } from './listarcomentarios/listarcomentarios.component';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [RouterOutlet, ListarcomentariosComponent],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
