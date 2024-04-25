import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertsService } from '../alerts.service';
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
 

  constructor(private router: Router,private fb: FormBuilder, private apiService: ApiService,private alertService: AlertsService) { }

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
        next: (response) =>
          this.alertService.insert("Sala insertada con exito"),
        

        error: (err) => this.alertService.error('No se inserto la sala')
      });

      this.router.navigate(['/crud']);

    }
  }


  
 
}
