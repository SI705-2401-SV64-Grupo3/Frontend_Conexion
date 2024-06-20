import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CrearusuarioComponent } from './components/usuario/crearusuario/crearusuario.component';
import { MetaComponent } from './components/meta/meta.component';
import { CrearmetaComponent } from './components/meta/crearmeta/crearmeta.component';
import { ConversacionComponent } from './components/conversacion/conversacion.component';
import { CrearconversacionComponent } from './components/conversacion/crearconversacion/crearconversacion.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { CrearComponent } from './components/publicacion/crear/crear.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CrearcomentariosComponent } from './components/comentarios/crearcomentarios/crearcomentarios.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CrearnotificacionesComponent } from './components/notificacion/crearnotificaciones/crearnotificaciones.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { RegistrarMensajesComponent } from './components/mensaje/registrar-mensajes/registrar-mensajes.component';
import { RolComponent } from './components/rol/rol.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { RegistrarRolComponent } from './components/rol/registrar-rol/registrar-rol.component';
import { RegistrarActividadComponent } from './components/actividad/registrar-actividad/registrar-actividad.component';
import { SugerenciaService } from './services/sugerencia.service';
import { CrearsugerenciaComponent } from './components/sugerencia/crearsugerencia/crearsugerencia.component';
import { RecordatorioComponent } from './components/recordatorio/recordatorio.component';
import { CrearrecordatorioComponent } from './components/recordatorio/crearrecordatorio/crearrecordatorio.component';
import { RecursoeducativoComponent } from './components/recursoeducativo/recursoeducativo.component';
import { CrearrecursoComponent } from './components/recursoeducativo/crearrecurso/crearrecurso.component';
import { SugerenciaComponent } from './components/sugerencia/sugerencia.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'usuarios', component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: CrearusuarioComponent },
      { path: 'ediciones/:id', component: CrearusuarioComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'metas', component: MetaComponent,
    children: [
      { path: 'nuevo', component: CrearmetaComponent },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'conversacion', component: ConversacionComponent,
    children: [
      { path: 'nuevoc', component: CrearconversacionComponent },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'publicaciones', component: PublicacionComponent,
    children: [
      { path: 'crear', component: CrearComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'comentarios', component: ComentariosComponent,
    children: [
      { path: 'crear', component: CrearcomentariosComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'notificaciones', component: NotificacionComponent,
    children: [
      { path: 'crear', component: CrearnotificacionesComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'Mensajes', component: MensajeComponent,
    children: [
      { path: 'RegistrarMensaje', component: RegistrarMensajesComponent },
      { path: 'ediciones/:id', component: RegistrarMensajesComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'Roles', component: RolComponent,
    children: [
      { path: 'RegistrarRol', component: RegistrarRolComponent },
      { path: 'ediciones/:id', component: RegistrarRolComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'Actividades', component: ActividadComponent,
    children: [
      { path: 'RegistrarActividad', component: RegistrarActividadComponent },
      { path: 'ediciones/:id', component: RegistrarActividadComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'sugerencias', component: SugerenciaComponent,
    children: [
      { path: 'registrar', component: CrearsugerenciaComponent },
      { path: 'ediciones/:id', component: CrearsugerenciaComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'recordatorio', component: RecordatorioComponent,
    children: [
      { path: 'registrar', component: CrearrecordatorioComponent },
      { path: 'ediciones/:id', component: CrearrecordatorioComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'recursos', component: RecursoeducativoComponent,
    children: [
      { path: 'registrar', component: CrearrecursoComponent },
      { path: 'ediciones/:id', component: CrearrecursoComponent }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
];
