import { Component } from '@angular/core';
import { ApiService } from '../api.service';

import { AlertsService } from '../alerts.service';
@Component({
  selector: 'app-salas-reservadas',
  templateUrl: './salas-reservadas.component.html',
  styleUrls: ['./salas-reservadas.component.css']
})
export class SalasReservadasComponent {
  reservaciones: any[] = [];

  constructor(private apiService: ApiService,private alertService: AlertsService) { }

  ngOnInit(): void {
    this.loadReservaciones();
  }

  loadReservaciones(): void {
    this.apiService.getReservaciones().subscribe({
      next: (data) => {
        this.reservaciones = data;
        
      },
      error: (error) => console.error('Error al obtener las reservaciones', error)
    });
  }

  liberarSala(idSala: number): void {
    this.apiService.cambiarDisponibilidadSala(idSala).subscribe({
        next: (response) => {
          this.alertService.insert("Sala liberada con exito")
            this.loadReservaciones();  // Recargar las reservaciones para reflejar el cambio
        },
        error: (error) => this.alertService.error('No se pudo liberar la sala')
    });
}

}
