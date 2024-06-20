import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../../models/comentario';
import { Publicacion } from '../../../models/publicacion';
import { ComentarioService } from '../../../services/comentario.service';
import { PublicacionService } from '../../../services/publicacion.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-crearcomentarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './crearcomentarios.component.html',
  styleUrl: './crearcomentarios.component.css'
})
export class CrearcomentariosComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario();
  listaPublicaciones: Publicacion[] = [];
  
  constructor(
    private cS: ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private pS: PublicacionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
      date: ['', Validators.required],
      hour:['',Validators.required],
      publicacion: [ '', Validators.required ]
    });
    this.pS.list().subscribe((data) => {
      this.listaPublicaciones = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.comentario.content = this.form.value.content;
      this.comentario.date = this.form.value.date;
      this.comentario.hour = this.form.value.hour;
      this.comentario.publication.id = this.form.value.publicacion;
      this.cS.insert(this.comentario).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });

      this.router.navigate(['comentarios']);
    }
  }
}
