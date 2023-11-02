import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { from } from 'rxjs';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MonitorComponent } from './monitor/monitor.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { UsuarioformComponent } from './usuarios/usuarioform.component';
import { HistorialComponent } from './historial/historial.component';
import { PaginatorhistorialComponent } from './paginatorhistorial/paginatorhistorial.component';
import { LoginComponent } from './usuarios/login.component';
import { PaginatorusuariosComponent } from './paginatorusuarios/paginatorusuarios.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

registerLocaleData(localEs, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'monitor', component: MonitorComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: UsuarioformComponent},
  {path: 'usuarios/form/:id', component: UsuarioformComponent},
  {path: 'historial/page/:page', component: HistorialComponent},
  {path: 'usuarios/page/:page', component: UsuariosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'estadisticas', component: EstadisticasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    FormComponent,
    FooterComponent,
    PaginatorComponent,
    DetalleComponent,
    MonitorComponent,
    UsuariosComponent,
    UsuarioformComponent,
    HistorialComponent,
    PaginatorhistorialComponent,
    LoginComponent,
    PaginatorusuariosComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule,
    MatMomentDateModule,
    ZXingScannerModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es'}, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
