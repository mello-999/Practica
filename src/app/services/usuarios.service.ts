import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(nombre: string) {
    return this.http.post(this.apiUrl, { nombre });
  }

  getUsuarios() {
    return this.http.get(this.apiUrl);
  }

getAlumnos() {
  return this.http.get('http://localhost:3000/alumnos');
}

crearAlumno(alumno: any) {
  return this.http.post('http://localhost:3000/alumnos', alumno);
}

}