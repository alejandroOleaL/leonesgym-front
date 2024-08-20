import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FormComponent } from './clientes/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RegistrosComponent } from './registros/registros.component';
import { PaginatorregistrosComponent } from './paginatorregistros/paginatorregistros.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { PaginatoroperacionesComponent } from './paginatoroperaciones/paginatoroperaciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { BienvenidaqrComponent } from './bienvenidaqr/bienvenidaqr.component';
import { InactivosComponent } from './inactivos/inactivos.component';
import { ActivosComponent } from './activos/activos.component';
import { DetalleventaComponent } from './usuarios/detalleventa/detalleventa.component';
import { ItemVentaComponent } from './ventas/item-venta.component';
import { VentasComponent } from './ventas/ventas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductosComponent } from './productos/productos.component';
import { ProductosFormComponent } from './productos/productos-form.component';

registerLocaleData(localEs, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/vencidos/page/:page', component: InactivosComponent},
  {path: 'clientes/activos/page/:page', component: ActivosComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'monitor/:id', component: MonitorComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: UsuarioformComponent},
  {path: 'usuarios/form/:id', component: UsuarioformComponent},
  {path: 'historial/page/:page', component: HistorialComponent},
  {path: 'usuarios/page/:page', component: UsuariosComponent},
  {path: 'registros/page/:page', component: RegistrosComponent},
  {path: 'operaciones/page/:page', component: OperacionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'bienvenida/:numero', component: BienvenidaComponent},
  {path: 'bienvenidaqr/:id', component: BienvenidaqrComponent},
  {path: 'ventas/:id', component: DetalleventaComponent},
  {path: 'venta/:id', component: ItemVentaComponent},
  {path: 'ventas/form/:usuarioId', component: VentasComponent},
  {path: 'productos/page/:page', component: ProductosComponent},
  {path: 'productos/form', component: ProductosFormComponent},
  {path: 'productos/form/:id', component: ProductosFormComponent}
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
    EstadisticasComponent,
    RegistrosComponent,
    PaginatorregistrosComponent,
    OperacionesComponent,
    PaginatoroperacionesComponent,
    BienvenidaComponent,
    BienvenidaqrComponent,
    InactivosComponent,
    ActivosComponent,
    DetalleventaComponent,
    ItemVentaComponent,
    VentasComponent,
    ProductosComponent,
    ProductosFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule,
    MatMomentDateModule,
    ZXingScannerModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    DragDropModule,
    MatSortModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es'}, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
