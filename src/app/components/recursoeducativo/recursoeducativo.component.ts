import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecursoComponent } from './listarrecurso/listarrecurso.component';

@Component({
  selector: 'app-recursoeducativo',
  standalone: true,
  imports: [RouterOutlet, ListarrecursoComponent],
  templateUrl: './recursoeducativo.component.html',
  styleUrl: './recursoeducativo.component.css'
})
export class RecursoeducativoComponent {
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void { }
}
