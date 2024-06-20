import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarconversacionComponent } from './listarconversacion/listarconversacion.component';

@Component({
  selector: 'app-conversacion',
  standalone: true,
  imports: [RouterOutlet,ListarconversacionComponent],
  templateUrl: './conversacion.component.html',
  styleUrl: './conversacion.component.css'
})
export class ConversacionComponent implements OnInit{
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void { }
}
