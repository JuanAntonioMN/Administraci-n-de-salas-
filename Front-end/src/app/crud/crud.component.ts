import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  constructor(private router: Router) {}

  agregar() {
    this.router.navigate(['/agregar']); 
  }
 
}
