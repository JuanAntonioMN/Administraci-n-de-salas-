import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Salas } from '../salas';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  sala: Salas | undefined;
  reservaForm: FormGroup;
  todayDate: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.todayDate = new Date().toISOString().split('T')[0];

    this.reservaForm = this.fb.group({
      fecha: [this.todayDate, Validators.required],
      hora_inicial: ['', Validators.required],
      hora_final: ['', Validators.required]
    }, { validators: this.timeValidator() });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cargarSala(id);
    });
  }

  cargarSala(id: number): void {
    this.apiService.getSala(id).subscribe({
      next: (sala) => {
        this.sala = sala;
      },
      error: (error) => console.error('Error al obtener la sala', error)
    });
  }

  confirmarReserva(): void {
    // Comprobar primero si el formulario es válido
    if (this.reservaForm.valid && this.sala) {
      const reservaData = {
        id_sala: this.sala.id_sala,
        hora_inicial: this.reservaForm.value.hora_inicial,
        hora_final: this.reservaForm.value.hora_final,
        fecha: this.reservaForm.value.fecha,
      };
  
      // Todo está bien, proceder con la reserva
      this.apiService.reservarSala(reservaData).subscribe({
        next: (response) => {
          console.log('Reserva realizada con éxito', response);
        },
        error: (error) => {
          console.error('Error al realizar la reserva', error);
        }
      });
    } else {
      // El formulario no es válido, manejar los errores
      if (this.reservaForm.errors && this.reservaForm.errors['timeInvalid']) {
        console.error('La duración de la reserva debe ser mayor de 0 horas y no exceder las 2 horas.');
      } else {
        console.error('Formulario no válido', this.reservaForm.errors);
      }
    }
  }
  

  // Validador personalizado para verificar la duración de la reserva
  timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as FormGroup; // Cast as FormGroup to access nested controls
      const start = form.get('hora_inicial')?.value;
      const end = form.get('hora_final')?.value;
      if (start && end) {
        const startDate = new Date(`1970-01-01T${start}`);
        const endDate = new Date(`1970-01-01T${end}`);
        const duration = (endDate.getTime() - startDate.getTime()) / 3600000; // Convertir milisegundos a horas

        if (duration <= 0 || duration > 2) {
          return { timeInvalid: true };
        }
      }
      return null;
    };
  }
}
