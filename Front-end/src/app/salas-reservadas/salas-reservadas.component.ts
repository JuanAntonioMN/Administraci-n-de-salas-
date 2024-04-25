import { Component } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-salas-reservadas',
  templateUrl: './salas-reservadas.component.html',
  styleUrls: ['./salas-reservadas.component.css']
})
export class SalasReservadasComponent {
  reservaciones: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadReservaciones();
  }

  loadReservaciones(): void {
    this.apiService.getReservaciones().subscribe({
      next: (data) => {
        this.reservaciones = data;
        console.log('Reservaciones cargadas', this.reservaciones);
      },
      error: (error) => console.error('Error al obtener las reservaciones', error)
    });
  }

  liberarSala(idSala: number): void {
    this.apiService.cambiarDisponibilidadSala(idSala).subscribe({
        next: (response) => {
            console.log(response.message);
            this.loadReservaciones();  // Recargar las reservaciones para reflejar el cambio
        },
        error: (error) => console.error('Error al cambiar la disponibilidad de la sala', error)
    });
}

}
