import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importar FormsModule aquí
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
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
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 5000,  
      positionClass: 'toast-bottom-right',  // Posición en la pantalla
      preventDuplicates: true,  // Evitar mensajes duplicados
      progressBar: true,  // Mostrar una barra de progreso
      easeTime: 300,  // Tiempo de la animación
      tapToDismiss: true  // Permitir cerrar al tocar
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
