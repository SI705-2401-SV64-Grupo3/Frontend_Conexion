import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Actividad } from '../../../models/actividad';
import { ActividadService } from '../../../services/actividad.service';


@Component({
  selector: 'app-registrar-actividad',
  standalone: true,
  imports: [MatIconModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink],
  templateUrl: './registrar-actividad.component.html',
  styleUrl: './registrar-actividad.component.css'
})
export class RegistrarActividadComponent {

  form: FormGroup = new FormGroup({});
  actividad: Actividad = new Actividad();
  listaUsuario: Usuario[] = [];


  id: number = 0;
  edicion: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private aS: ActividadService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({

      codigo: [''],
      usuario1: ['', Validators.required],
      usuario2: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', Validators.required],
      lugar: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });


  }
  registrar(): void {
    if (this.form.valid) {
      this.actividad.id = this.form.value.codigo;
      this.actividad.nameActivity = this.form.value.nombre;
      this.actividad.description = this.form.value.descripcion;
      this.actividad.date = this.form.value.fecha;
      this.actividad.durationActivity = this.form.value.duracion;
      this.actividad.placeActivity = this.form.value.lugar;
      this.actividad.user1.id = this.form.value.usuario1;
      this.actividad.user2.id = this.form.value.usuario2;



      if (this.edicion) {
        this.aS.update(this.actividad).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.actividad).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['Actividades']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),        
          nombre: new FormControl(data.nameActivity),
          descripcion: new FormControl(data.description),
          fecha: new FormControl(data.date),
          duracion: new FormControl(data.durationActivity),
          lugar: new FormControl(data.placeActivity),
          usuario1: new FormControl(data.user1.name),
          usuario2: new FormControl(data.user2.name),

        });
      });
    }
  }



}
