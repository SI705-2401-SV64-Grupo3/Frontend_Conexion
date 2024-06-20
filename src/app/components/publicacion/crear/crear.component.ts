import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
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
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear',
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
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  publicacion: Publicacion = new Publicacion();
  listaUsuarios: Usuario[] = [];
  
  constructor(
    private pS: PublicacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      likes: ['', Validators.required],
      shared: ['', Validators.required],
      usuario: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.publicacion.content = this.form.value.content      
      this.publicacion.date = this.form.value.date
      this.publicacion.hour = this.form.value.hour
      this.publicacion.likes = this.form.value.likes
      this.publicacion.shared = this.form.value.shared
      this.publicacion.user.id = this.form.value.usuario;

      this.pS.insert(this.publicacion).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data)
        })
      });
    
      this.router.navigate(['publicaciones'])
    }
  }
}
