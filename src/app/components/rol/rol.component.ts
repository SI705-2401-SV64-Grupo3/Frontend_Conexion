import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRolComponent } from './listar-rol/listar-rol.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [RouterOutlet, ListarRolComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {

}
}
