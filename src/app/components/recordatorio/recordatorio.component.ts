import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecordatorioComponent } from './listarrecordatorio/listarrecordatorio.component';

@Component({
  selector: 'app-recordatorio',
  standalone: true,
  imports: [RouterOutlet,ListarrecordatorioComponent],
  templateUrl: './recordatorio.component.html',
  styleUrl: './recordatorio.component.css'
})
export class RecordatorioComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void { }
}
