import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recursoeducativo } from '../../../models/recursoeducativo';
import { Usuario } from '../../../models/usuario';
import { RecursoeducativoService } from '../../../services/recursoeducativo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-crearrecurso',
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
  templateUrl: './crearrecurso.component.html',
  styleUrl: './crearrecurso.component.css'
})
export class CrearrecursoComponent {
  form: FormGroup = new FormGroup({});
  recursoeducativo: Recursoeducativo = new Recursoeducativo();
  listaUsuarios: Usuario[] = [];

  estado: { value: string; viewValue: string }[] = [
    { value: 'Texto', viewValue: 'Texto' },
    { value: 'Video', viewValue: 'Video' },
  ];
  reestado: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En proceso', viewValue: 'En proceso' },
    { value: 'Logrado', viewValue: 'Logrado' },
    { value: 'Abandonado', viewValue: 'Abandonado' },
  ];
  constructor(
    private reS: RecursoeducativoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      user: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.recursoeducativo.resourceType = this.form.value.tipo;
      this.recursoeducativo.resourceDescription = this.form.value.descripcion;
      this.recursoeducativo.resourceStatus = this.form.value.estado;
      this.recursoeducativo.user.id = this.form.value.user;
      this.reS.insert(this.recursoeducativo).subscribe((data) => {
        this.reS.list().subscribe((data) => {
          this.reS.setList(data);
        });
      });

      this.router.navigate(['recursos']);
    }
  }
}
