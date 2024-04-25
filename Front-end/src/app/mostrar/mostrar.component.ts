import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Salas } from '../salas';
import { Router } from '@angular/router';
import { AlertsService } from '../alerts.service';
@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  salas:Salas[]=[];//Arreglo de salas 
  estado:string="";

  constructor(private router: Router,private api:ApiService,private alertService: AlertsService){}
  ngOnInit(): void {
    this.mostrarSalas();
  }

  mostrarSalas(): void {
    this.api.getSalas().subscribe({
      next: (data) => this.salas = data,
      error: (err) => console.error('Failed to get users', err)
    });
  }

  eliminarSala(id: number): void {
    this.api.eliminarSala(id).subscribe({
      next: () => {
        this.alertService.insert("La sala se eliminada con exito")
        this.salas = this.salas.filter(sala => sala.id_sala !== id); 
      },
      error: (err) => this.alertService.error('No se pudo eliminar la sala')
    });
  }
  
  modificar(id_sala:number){
    this.router.navigate(['/editar-sala', id_sala]);
  }
}
