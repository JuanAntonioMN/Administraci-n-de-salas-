import { Component } from '@angular/core';
import { Router } from '@angular/router';//Para utilizar el router de angular en nuestro componente lo mandamos a llamar
@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css']
})
export class VistaPrincipalComponent {
  constructor(private router: Router) {}

  reservaciones() {
    this.router.navigate(['/reservarSalas']); 
  }
  crud(){
    this.router.navigate(['/crud']);
  }
}
