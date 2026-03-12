import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './k-boom-gym.html',
  styleUrls: ['./k-boom-gym.css',],
  standalone: true
  
})
export class App {
  protected readonly title = signal('nombre-del-proyecto');


  mostrarFotos: boolean = false;

  fotos: string[] = [
    'IMG_20250904_115234_760.jpg',
    'IMG-20250824-WA0068.jpg',
    'IMG-20250824-WA0073.jpg'
  ];

  mostrarGaleria() {
    this.mostrarFotos = true;
  }

 
  verClases: boolean = false;

  listaClases = [
    { Nombre: 'MMA', hora: '19:00' },
    { Nombre: 'Wrestling', hora: '20:00' },
    { Nombre: 'Boxeo', hora: '21:00' },
    { Nombre: 'Físico', hora: '22:00' }
  ];

  mostrarClases() {
    this.verClases = true;
  }



}




 