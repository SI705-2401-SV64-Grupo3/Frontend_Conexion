import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarMensajesComponent } from './listar-mensajes/listar-mensajes.component';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [RouterOutlet, ListarMensajesComponent],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent implements OnInit{

  constructor(public route:ActivatedRoute){}
  
  ngOnInit(): void {
    
  }

}
