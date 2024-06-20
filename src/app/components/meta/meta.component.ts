import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmetaComponent } from './listarmeta/listarmeta.component';

@Component({
  selector: 'app-meta',
  standalone: true,
  imports: [RouterOutlet, ListarmetaComponent],
  templateUrl: './meta.component.html',
  styleUrl: './meta.component.css'
})
export class MetaComponent implements OnInit {
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void { }

}
