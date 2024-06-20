import { Conversacion } from './../../../models/conversacion';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { ConversacionService } from '../../../services/conversacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import moment from 'moment';

@Component({
  selector: 'app-crearconversacion',
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
  templateUrl: './crearconversacion.component.html',
  styleUrl: './crearconversacion.component.css'
})
export class CrearconversacionComponent {
  form: FormGroup = new FormGroup({});
  conversacion: Conversacion = new Conversacion();
  listaUsuario: Usuario[] = [];
  maxFecha: Date = moment().add(0, 'days').toDate();

  constructor(
    private cS: ConversacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      usuario1: ['', Validators.required],
      usuario2:['',Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.conversacion.startDate = this.form.value.fecha;
      this.conversacion.user1.id = this.form.value.usuario1;
      this.conversacion.user2.id = this.form.value.usuario2;
      this.cS.insert(this.conversacion).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });

      this.router.navigate(['conversacion']);
    }
  }
}

