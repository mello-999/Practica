import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './k-boom-gym.html',
  styleUrls: ['./k-boom-gym.css',],
  standalone: true
  
})
export class App implements OnInit, OnDestroy {
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
  this.fotoSeleccionada = null;
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
 

  mostrar = false

  alumnoSeleccionado: any | null = null;

  alumnos = [
    { nombre: 'Camilo', edad: 16, categoria: '60 kg.', club: 'K-boom', ciudad: 'Los Andes', record: '5-0', fotos: '/IMG_camilo.jpg' },
    { nombre: 'Gaspar', edad: 15, categoria: '57 kg.', club: 'K-boom', ciudad: 'Los Andes', record: '4-0', fotos: '/IMG_gaspar.jpg' },
    { nombre: 'Alonso', edad: 15, categoria: '55 kg.', club: 'K-boom', ciudad: 'Los Andes', record: '6-0', fotos: '/IMG_alonso.jpg' }
  ];

   mostrarAlumnos() {
    this.mostrar = !this.mostrar;
   }

verAlumno(alumno: any) {
  this.alumnoSeleccionado = alumno;   // Guarda todo el alumno
  this.fotoSeleccionada = alumno.fotos; // Opcional: también muestra la foto
}

cerrarAlumno() {
  this.alumnoSeleccionado = null;
  this.fotoSeleccionada = null; // Opcional: cierra la foto también
}

private scrollListener: () => void = () => {
  const btn = document.querySelector('.boton-atras') as HTMLElement;
  if (btn) { // ejemplo, después de 200px de scroll
    btn.style.opacity = window.scrollY > 200 ? '0.5' : '1' ; // menos visible
  }
};

ngOnInit(): void {
  this.fotos.sort();
  
  window.addEventListener('scroll', this.scrollListener);
}

ngOnDestroy(): void {
  window.removeEventListener('scroll', this.scrollListener);
}

}



 