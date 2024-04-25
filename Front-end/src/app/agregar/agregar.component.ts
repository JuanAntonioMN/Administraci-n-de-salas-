import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Salas } from '../salas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  salaForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    capacidad: ['', Validators.required],
    available:[false]
    
  });
 

  constructor(private router: Router,private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.salaForm = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', Validators.required],
      available:[false]
    });
  }

  onSubmit(): void {
    if (this.salaForm.valid) {
      this.apiService.insertSala(this.salaForm.value).subscribe({
        next: (response) => console.log('Sala agregada', response),
        error: (err) => console.error('Error al agregar sala', err)
      });
    }
  }

  regresar(){
    this.router.navigate(['../crud']);
  }
  
 
}
