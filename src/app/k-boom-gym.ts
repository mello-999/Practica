import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule,],
  templateUrl: './k-boom-gym.html',
  styleUrls: ['./k-boom-gym.css',],
  standalone: true
  
})
export class AppKboomComponent implements OnInit, OnDestroy {
  protected readonly title = signal('nombre-del-proyecto');

  baseUrl = 'http://localhost:3000'

  nombre: string = '';

  mostrarFotos: boolean = false;

  fotoSeleccionadaAlumno: string | null = null;
  fotoSeleccionadaGaleria: string | null = null;

  galeriaFotos: string[] = [];


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

  this.fotoSeleccionadaAlumno = null;
  this.fotoSeleccionadaGaleria = null;
  this.alumnoSeleccionado = null;
} 
  
//--- Para agrandar las fotos dentro del boton fotos--- //



// ---Variable nueva para las fotos, flechas siguiente y anterior--- //


indiceFoto: number = 0;

// Abrir lightbox y registrar índice
abrirFoto(indice: number) {
  this.indiceFoto = indice;
  this.fotoSeleccionadaGaleria = this.galeriaFotos[indice];
}

// Siguiente foto
siguienteFoto() {
  if (this.indiceFoto < this.galeriaFotos.length - 1) {
    this.indiceFoto++;
    this.fotoSeleccionadaGaleria = this.galeriaFotos[this.indiceFoto];
  }
}

// Foto anterior
fotoAnterior() {
  if (this.indiceFoto > 0) {
    this.indiceFoto--;
    this.fotoSeleccionadaGaleria = this.galeriaFotos[this.indiceFoto];
  }
}
cerrarLightbox() {
  this.fotoSeleccionadaGaleria = null;
}
 
constructor(private usuariosService: UsuariosService) {}
            private http = inject(HttpClient);
  mostrar = false

  alumnoSeleccionado: any | null = null;

 alumnos: any[] = [];

   mostrarAlumnos() {
    this.mostrar = true;
    this.cargarAlumnos();
   }

cargarGaleria() {
  this.http.get<string[]>(this.baseUrl + '/galeria')
   .subscribe((res) => {
       this.galeriaFotos = res.map(img => this.baseUrl + img);
   });
}
    

verAlumno(alumno: any) {
  this.alumnoSeleccionado = alumno;   // Guarda todo el alumno
  this.fotoSeleccionadaAlumno = alumno.fotos; // Opcional: también muestra la foto
}

cerrarAlumno() {
  this.alumnoSeleccionado = null;
  this.fotoSeleccionadaAlumno = null; // Opcional: cierra la foto también
}

private scrollListener: () => void = () => {
  const btn = document.querySelector('.boton-atras') as HTMLElement;
  if (btn) { // ejemplo, después de 200px de scroll
    btn.style.opacity = window.scrollY > 200 ? '0.5' : '1' ; // menos visible
  }
};

ngOnInit(): void {
  this.cargarAlumnos();
  this.cargarGaleria();
  window.addEventListener('scroll', this.scrollListener);
}

ngOnDestroy(): void {
  window.removeEventListener('scroll', this.scrollListener);
}

cargarAlumnos() {
  this.usuariosService.getAlumnos().subscribe((res: any) => {
    this.alumnos = res;
  });
}


guardar() {
  this.usuariosService.crearUsuario(this.nombre).subscribe(res => {
    console.log('Guardado en BD:', res);
    this.nombre = '';
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



 