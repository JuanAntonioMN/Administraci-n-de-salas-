import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertsService } from '../alerts.service';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit{
  salaForm:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    capacidad: ['', Validators.required],
    available:[false]
    
  });
  id?: number;

  constructor(private fb: FormBuilder,private apiService: ApiService,private route: ActivatedRoute,private router: Router,private alertService: AlertsService) {
      this.salaForm = this.fb.group({
        nombre: ['', Validators.required],
        capacidad: ['', Validators.required],
        available: [false]
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // el '+' convierte el parámetro de string a número
      this.loadSalaData();
    });
  }

  loadSalaData(): void {
    if (this.id !== undefined) {
      this.apiService.getSala(this.id).subscribe({
        next: (data) => {
          this.salaForm = this.fb.group({
            nombre: ['', Validators.required],
            capacidad: ['', Validators.required], 
            available: [false]
          });
          
        },
        error: (err) => console.error('Error al cargar la sala', err)
      });
    } else {
      console.error('ID de sala no definido.');
    }
  }
  
  onSubmit(): void {
    if (this.salaForm?.valid && this.id !== undefined) {
      this.apiService.modificarSala(this.id, this.salaForm.value).subscribe({
        next: () => {
          this.alertService.insert("Sala modificada con exito")
          this.router.navigate(['/crud']);  // Asumiendo que quieres redirigir al usuario
        },
     
        error:()=>this.alertService.error('Error al actualizar la sala')

      });
    } else {
      
      this.alertService.error('Formulario no válido o ID de sala no definido.')
    }
    this.router.navigate(['/crud']);
  }
  
}
