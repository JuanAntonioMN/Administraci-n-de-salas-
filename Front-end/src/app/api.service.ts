import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salas } from './salas';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';  // URL de tu API

  constructor(private http: HttpClient) { }

  //Obtener todas las salas
  getSalas(): Observable<Salas[]> {
    const url = `${this.apiUrl}/salas/mostrar`;  // Construye la URL completa aquí
    return this.http.get<Salas[]>(url);
  }

   //Obtener sala
   getSala(id:number):Observable<Salas>{
    const url = `${this.apiUrl}/salas/${id}`;  // Construye la URL completa aquí
    return this.http.get<Salas>(url);
   }

  //Insertar en la base de datos
  insertSala(salaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salas/insertar`, salaData);
  }

  modificarSala(id: number, salaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/salas/${id}`, salaData, {
        headers: { 'Content-Type': 'application/json' }
    });
  }

  //Eliminar una sala
   eliminarSala(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/salas/${id}`);
  }

   // Obtener salas disponibles
  getSalasDisponibles(): Observable<Salas[]> {
    return this.http.get<Salas[]>(`${this.apiUrl}/salas/disponibles`);
  }

  // Obtener salas no disponibles
  getSalasNoDisponibles(): Observable<Salas[]> {
    return this.http.get<Salas[]>(`${this.apiUrl}/salas/no-disponibles`);
  }

  //Insertar reservacion
  reservarSala(reservacionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservacion`, reservacionData);
  }
  
  //Ver las reservaciones
  getReservaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservacion/mostrar`);
  }
  //liberar sala
  
  cambiarDisponibilidadSala(idSala: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservacion/liberar-sala/${idSala}`, {});
  }

}
