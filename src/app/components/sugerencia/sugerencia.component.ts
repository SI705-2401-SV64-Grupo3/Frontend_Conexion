import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsugerenciaComponent } from './listarsugerencia/listarsugerencia.component';

@Component({
  selector: 'app-sugerencia',
  standalone: true,
  imports: [RouterOutlet, ListarsugerenciaComponent],
  templateUrl: './sugerencia.component.html',
  styleUrl: './sugerencia.component.css'
})
export class SugerenciaComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void { }
}
