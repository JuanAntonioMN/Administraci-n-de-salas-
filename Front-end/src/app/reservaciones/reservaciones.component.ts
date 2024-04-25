import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Salas } from '../salas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
  salasDisponibles: Salas[] = [];

  

  constructor(private router: Router,private api:ApiService){}
  ngOnInit(): void {
    this.cargarSalasDisponibles();
  }

  cargarSalasDisponibles(): void {
    this.api.getSalasDisponibles().subscribe({
      next: (data) => {
        this.salasDisponibles = data;
       
      },
      error: (error) => console.error('Error al obtener las salas disponibles', error)
    });
  }

  reservarSala(id_sala: number): void {

    this.router.navigate(['/reservar', id_sala]);
  }
  
}
