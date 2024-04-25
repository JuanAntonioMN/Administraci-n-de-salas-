import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importar FormsModule aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { VistaPrincipalComponent } from './vista-principal/vista-principal.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { AgregarComponent } from './agregar/agregar.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ModificarComponent } from './modificar/modificar.component';
import { SalasReservadasComponent } from './salas-reservadas/salas-reservadas.component';
import { ReservarComponent } from './reservar/reservar.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    VistaPrincipalComponent,
    ReservacionesComponent,
    AgregarComponent,
    MostrarComponent,
    NavBarComponent,
    ModificarComponent,
    SalasReservadasComponent,
    ReservarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
