import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Role } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registrar-rol',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  RouterLink],
  templateUrl: './registrar-rol.component.html',
  styleUrl: './registrar-rol.component.css'
})
export class RegistrarRolComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  rol: Role = new Role();
  listaUsuario: Usuario[]=[];

  id: number = 0;
  edicion: boolean = true;

  roles: { value: string; viewValue: string }[] = [
    { value: 'PADRE', viewValue: 'PADRE' },
    { value: 'HIJO', viewValue: 'HIJO' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      usuario: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.rol.id=this.form.value.codigo;
      this.rol.rol = this.form.value.rol;
      this.rol.user.id=this.form.value.usuario;
      

      if (this.edicion) {
        this.rS.update(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['Roles']);
    }
  }

  init() {

    if(this.edicion){
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          rol: new FormControl(data.rol),
          usuario: new FormControl(data.user.name)
          
        });
      });

    }
    
  }

}
