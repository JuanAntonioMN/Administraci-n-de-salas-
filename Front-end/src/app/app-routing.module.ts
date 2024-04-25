import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPrincipalComponent } from './vista-principal/vista-principal.component';
import { CrudComponent } from './crud/crud.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ModificarComponent } from './modificar/modificar.component';
import { SalasReservadasComponent } from './salas-reservadas/salas-reservadas.component';
import { ReservarComponent } from './reservar/reservar.component';

const routes: Routes = [
  {path:'home',component:VistaPrincipalComponent},
  {path:'crud',component:CrudComponent},
  {path:'agregar',component:AgregarComponent},
  {path:'editar-sala/:id',component:ModificarComponent},
  {path:'reservarSalas',component:ReservacionesComponent},
  {path:'reservar/:id',component:ReservarComponent},
  {path:'salasReservadas',component:SalasReservadasComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //Tenemos una ruta predeterminada para nuestra aplicacion simpre nos mandara al componente de vistaPrincipal
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
