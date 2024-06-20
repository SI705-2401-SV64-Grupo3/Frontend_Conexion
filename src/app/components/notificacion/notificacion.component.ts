import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarnotificacionesComponent } from './listarnotificaciones/listarnotificaciones.component';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [RouterOutlet, ListarnotificacionesComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
