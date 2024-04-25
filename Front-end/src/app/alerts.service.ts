import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  insert(message: string): void {
    this.toastr.success(`<i class="fa-solid fa-face-smile"></i> ${message}`, '', {
      enableHtml: true, // Permitir HTML en las alertas
      toastClass: 'toast toast-success',  
      progressBar: true, // Mantiene la barra de progreso
      titleClass: 'toast-title',
      messageClass: 'toast-message'
    });
  }
  
  error(message: string): void {
    this.toastr.error(`<i class="fa-solid fa-face-sad-tear"></i> ${message}`, '', {
      enableHtml: true, // Permitir HTML en las alertas
      toastClass: 'toast toast-error',  
      progressBar: true, // Mantiene la barra de progreso
      titleClass: 'toast-title',
      messageClass: 'toast-message'
    });
  }
  

}
