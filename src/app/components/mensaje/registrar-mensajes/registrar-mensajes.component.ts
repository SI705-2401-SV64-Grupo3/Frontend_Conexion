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
import { MensajeService } from '../../../services/mensaje.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ConversacionService } from '../../../services/conversacion.service';
import { Conversacion } from '../../../models/conversacion';
import { Usuario } from '../../../models/usuario';
import { Mensaje } from '../../../models/mensaje';

@Component({
  selector: 'app-registrar-mensajes',
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
    RouterLink,],
  templateUrl: './registrar-mensajes.component.html',
  styleUrl: './registrar-mensajes.component.css'
})
export class RegistrarMensajesComponent {

  form: FormGroup = new FormGroup({});
  mensaje: Mensaje = new Mensaje();
  listaUsuario: Usuario[] = [];
  listaConversacion: Conversacion[] = []

  id: number = 0;
  edicion: boolean = false;

  estado: { value: string; viewValue: string }[] = [
    { value: 'Enviado', viewValue: 'Enviado' },
    { value: 'Recibido', viewValue: 'Recibido' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MensajeService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private cS: ConversacionService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      conversacion: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });

    this.cS.list().subscribe((data) => {
      this.listaConversacion = data;
    });

  }
  registrar(): void {
    if (this.form.valid) {
      this.mensaje.id = this.form.value.codigo;
      this.mensaje.content = this.form.value.contenido;
      this.mensaje.date = this.form.value.fecha;
      this.mensaje.hour = this.form.value.hora;
      this.mensaje.statusMessage = this.form.value.estado;
      this.mensaje.user.id = this.form.value.usuario;
      this.mensaje.conversation.id = this.form.value.conversacion;


      if (this.edicion) {
        this.mS.update(this.mensaje).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.mensaje).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['Mensajes']);
    }
  }

  init() {
    if(this.edicion){
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          contenido: new FormControl(data.content),
          fecha: new FormControl(data.date),
          hora: new FormControl(data.hour),
          estado: new FormControl(data.statusMessage),
          usuario: new FormControl(data.user.name),
          conversacion: new FormControl(data.conversation.id),
  
        });
      });
    }
  }


}
