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
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crearusuario',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './crearusuario.component.html',
  styleUrl: './crearusuario.component.css'
})
export class CrearusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  edicion: boolean = false;
  id: number = 0;
  maxFecha: Date = moment().add(-8,'years').toDate();
  genero: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' }
  ];

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      idpadre: [''],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      descripcion: ['', Validators.required],
      preferencia: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.id = this.form.value.codigo;
      this.usuario.idFather = this.form.value.idpadre;
      this.usuario.username = this.form.value.usuario;
      this.usuario.password = this.form.value.contraseña;
      this.usuario.name = this.form.value.nombre;
      this.usuario.lastName = this.form.value.apellidos;
      this.usuario.mail = this.form.value.email;
      this.usuario.birthDate = this.form.value.nacimiento;
      this.usuario.genre = this.form.value.genero;
      this.usuario.description = this.form.value.descripcion;
      this.usuario.preference = this.form.value.preferencia;
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          idpadre: new FormControl(data.idFather),
          usuario: new FormControl(data.username),
          contraseña: new FormControl(data.password),
          nombre: new FormControl(data.name),
          apellidos: new FormControl(data.lastName),
          email: new FormControl(data.mail),
          nacimiento: new FormControl(data.birthDate),
          genero: new FormControl(data.genre),
          descripcion: new FormControl(data.description),
          preferencia: new FormControl(data.preference),

        });
      });
    }
  }

}
