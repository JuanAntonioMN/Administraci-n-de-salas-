import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Salas } from '../salas';
import { AlertsService } from '../alerts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  sala: Salas | undefined;
  reservaForm: FormGroup;
  todayDate: string;

  constructor(private router: Router,private apiService: ApiService,private route: ActivatedRoute,private fb: FormBuilder,private alertService: AlertsService) {
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
   
    if (this.reservaForm.valid && this.sala) {
      const reservaData = {
        id_sala: this.sala.id_sala,
        hora_inicial: this.reservaForm.value.hora_inicial,
        hora_final: this.reservaForm.value.hora_final,
        fecha: this.reservaForm.value.fecha,
      };
  
    
      this.apiService.reservarSala(reservaData).subscribe({
        next: (response) => {
          this.alertService.insert("Sala reservada con exito")
        },
        error: (error) => {
          this.alertService.error('No se pudo reservar la sala')
        }
      });

      this.router.navigate(['/reservarSalas']);
    } else {
      
      if (this.reservaForm.errors && this.reservaForm.errors['timeInvalid']) {
        this.alertService.error('La duración de la reserva no es valido');
      } else {
        this.alertService.error('Formulario no valido')
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
