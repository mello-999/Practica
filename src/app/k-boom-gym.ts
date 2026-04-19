import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './k-boom-gym.html',
  styleUrls: ['./k-boom-gym.css',],
  standalone: true
  
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('nombre-del-proyecto');

  nombre: string = '';

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
 
constructor(private usuariosService: UsuariosService) {}

  mostrar = false

  alumnoSeleccionado: any | null = null;

 alumnos: any[] = [];

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


guardar() {
  this.usuariosService.crearUsuario(this.nombre).subscribe(res => {
    console.log('Guardado en BD:', res);
    this.nombre = '';
  });
}



cargarAlumnos() {
  this.usuariosService.getAlumnos().subscribe((res: any) => {
    this.alumnos = res;
  });
}


nuevoAlumno = {
  nombre: '',
  edad: null,
  categoria: '',
  club: '',
  ciudad: '',
  record: '',
  fotos: ''
};


agregarAlumno() {
  this.usuariosService.crearAlumno(this.nuevoAlumno).subscribe(res => {
    console.log('Alumno agregado:', res);
    this.cargarAlumnos(); // refresca lista
  });
}

}



 