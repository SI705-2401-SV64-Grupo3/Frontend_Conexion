import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { Recordatorio } from '../../../models/recordatorio';
import { RecordatorioService } from '../../../services/recordatorio.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crearrecordatorio',
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
    MatIconModule,
  ],
  templateUrl: './crearrecordatorio.component.html',
  styleUrl: './crearrecordatorio.component.css'
})
export class CrearrecordatorioComponent {
  form: FormGroup = new FormGroup({});
  minFecha: Date = moment().add(1, 'days').toDate();
  recordatorio: Recordatorio = new Recordatorio();
  listaUsuarios: Usuario[] = [];


  id: number = 0;
  edicion: boolean = false;

  estado: { value: string; viewValue: string }[] = [
    { value: 'Revisado', viewValue: 'Revisado' },
    { value: 'No revisado', viewValue: 'No revisado' },
    { value: 'Pendiente', viewValue: 'Pendiente' }
  ];

  constructor(private formBuilder: FormBuilder,
    private rS: RecordatorioService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.recordatorio.id = this.form.value.codigo;
      this.recordatorio.user.id = this.form.value.usuario;
      this.recordatorio.date = this.form.value.fecha;
      this.recordatorio.hour = this.form.value.hora;
      this.recordatorio.asunt = this.form.value.asunto;
      this.recordatorio.message = this.form.value.mensaje;
      this.recordatorio.stateRecoradatory = this.form.value.estado;
      this.rS.insert(this.recordatorio).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['recordatorio']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          usuario: new FormControl(data.user),
          fecha: new FormControl(data.date),
          hora: new FormControl(data.hour),
          asunto: new FormControl(data.asunt),
          mensaje: new FormControl(data.message),
          estado: new FormControl(data.stateRecoradatory),
        });
      });
    }
  }
}
