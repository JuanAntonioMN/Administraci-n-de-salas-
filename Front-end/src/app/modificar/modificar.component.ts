import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute,Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
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
          console.log('Sala actualizada con éxito');
          this.router.navigate(['/crud']);  // Asumiendo que quieres redirigir al usuario
        },
        error: (err) => console.error('Error al actualizar la sala', err)
      });
    } else {
      console.error('Formulario no válido o ID de sala no definido.');
    }
  }
  
}
