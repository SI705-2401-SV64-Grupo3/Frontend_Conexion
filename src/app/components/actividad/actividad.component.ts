import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarActividadComponent } from './listar-actividad/listar-actividad.component';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [RouterOutlet, ListarActividadComponent],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
