import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { Publicacion } from '../../../models/publicacion';
import { PublicacionService } from '../../../services/publicacion.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-crearnotificaciones',
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
    RouterLink,],
  templateUrl: './crearnotificaciones.component.html',
  styleUrl: './crearnotificaciones.component.css'
})
export class CrearnotificacionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  notificacion: Notificacion = new Notificacion();
  listaPublicaciones: Publicacion[] = [];
  
  constructor(
    private nS: NotificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private pS: PublicacionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
      date: ['', Validators.required],
      publicacion: [ '', Validators.required ]
    });
    this.pS.list().subscribe((data) => {
      this.listaPublicaciones = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.notificacion.content = this.form.value.content;
      this.notificacion.date = this.form.value.date;
      this.notificacion.publication.id = this.form.value.publicacion;
      this.nS.insert(this.notificacion).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
      });

      this.router.navigate(['notificaciones']);
    }
  }
}
