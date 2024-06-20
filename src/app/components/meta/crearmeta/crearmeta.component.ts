import { UsuarioService } from './../../../services/usuario.service';
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
import { Meta } from '../../../models/meta';
import { MetaService } from '../../../services/meta.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-crearmeta',
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
  templateUrl: './crearmeta.component.html',
  styleUrl: './crearmeta.component.css'
})
export class CrearmetaComponent {
  form: FormGroup = new FormGroup({});
  meta: Meta = new Meta();
  listaUsuarios: Usuario[] = [];

  estatoMeta: { value: string; viewValue: string }[] = [
    { value: 'Iniciando', viewValue: 'Iniciando' },
    { value: 'En proceso', viewValue: 'En proceso' },
    { value: 'Logrado', viewValue: 'Logrado' },
    { value: 'No Logrado', viewValue: 'No Logrado' },
  ];
  constructor(
    private mS: MetaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado:['',Validators.required],
      userid:['',Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.meta.nameGoal = this.form.value.nombre;
      this.meta.description = this.form.value.descripcion;
      this.meta.estateGoal = this.form.value.estado;
      this.meta.user.id = this.form.value.userid;
      this.mS.insert(this.meta).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });

      this.router.navigate(['metas']);
    }
  }
}
