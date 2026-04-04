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
    'IMG-20250824-WA0073.jpg',
    'IMG_20250913_152020.jpg'
  ];

  mostrarGaleria() {
    this.mostrarFotos = true;
  }

 
  verClases: boolean = false;

  listaClases = [
    { Nombre: 'MMA', hora: '22:00' },
    { Nombre: 'Wrestling', hora: '20:00' },
    { Nombre: 'Boxeo', hora: '21:00' },
    { Nombre: 'Físico', hora: '22:00' }
  ];

  mostrarClases() {
    this.verClases = true;
  }

volverInicio() {
  this.mostrar = false;
  this.verClases = false;
  this.mostrarFotos = false;
} 
//--- Para agrandar las fotos dentro del boton fotos--- //

fotoSeleccionada: string | null = null;

// ---Variable nueva para las fotos, flechas siguiente y anterior--- //


indiceFoto: number = 0;

// Abrir lightbox y registrar índice
abrirFoto(indice: number) {
  this.indiceFoto = indice;
  this.fotoSeleccionada = this.fotos[indice];
}

// Siguiente foto
siguienteFoto() {
  if (this.indiceFoto < this.fotos.length - 1) {
    this.indiceFoto++;
    this.fotoSeleccionada = this.fotos[this.indiceFoto];
  }
}

// Foto anterior
fotoAnterior() {
  if (this.indiceFoto > 0) {
    this.indiceFoto--;
    this.fotoSeleccionada = this.fotos[this.indiceFoto];
  }
}
cerrarLightbox() {
  this.fotoSeleccionada = null;
}

// Para ordenar Fotos 

ngOnInit() {
  this.fotos.sort(); // esto ordena los nombres de menor a mayor
}

   
  mostrar = false

  alumnos = [
    { nombre: 'camilo', edad: 16, categoria: '60 kg.' },
    { nombre: 'gaspar', edad: 15, categoria: '57 kg.' },
    { nombre: 'alonso', edad: 15, categoria: '55 kg.' }
  ];

   mostrarAlumnos() {
    this.mostrar = !this.mostrar;
   }

}



 