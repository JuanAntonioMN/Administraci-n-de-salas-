import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Salas } from '../salas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  salas:Salas[]=[];//Arreglo de salas 
  estado:string="";

  constructor(private router: Router,private api:ApiService){}
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
        console.log('Sala eliminada con éxito');
        this.salas = this.salas.filter(sala => sala.id_sala !== id); // Actualiza la lista en el frontend
      },
      error: (err) => console.error('Error al eliminar la sala', err)
    });
  }
  
  modificar(id_sala:number){
    this.router.navigate(['/editar-sala', id_sala]);
  }
}
