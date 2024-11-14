import { Component, OnInit } from '@angular/core';
import { ApiService, Receta } from '../api.service';
import { Categoria } from '../categorias/categoria'; // Importar la interfaz desde categoria.ts

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  categorias: Categoria[] = [];
  nuevaReceta: Receta = {
      id: 0, nombreReceta: '', categoria: { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' }, instrucciones: '', fechaCreacion: '', fechaActualizacion: '', idRecetaIngrediente: 0
  };
  recetaEditando: Receta | null = null;
  nombreReceta: string = '';
  instrucciones: string = '';
  categoriaId: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerRecetas();
    this.obtenerCategorias();
  }

  obtenerRecetas(): void {
    this.apiService.getRecetas().subscribe((recetas: Receta[]) => {
      this.recetas = recetas;
    });
  }

  obtenerCategorias(): void {
    this.apiService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  agregarReceta(): void {
    if (this.recetaEditando) {
      this.recetaEditando.nombreReceta = this.nombreReceta;
      this.recetaEditando.instrucciones = this.instrucciones;
      this.recetaEditando.categoria.idCategoria = this.categoriaId;
      this.apiService.updateReceta(this.recetaEditando.id, this.recetaEditando).subscribe(() => {
        this.obtenerRecetas();
        this.recetaEditando = null; // Limpiar el formulario después de editar
        this.nombreReceta = '';
        this.instrucciones = '';
        this.categoriaId = 0;
      });
    } else {
      this.nuevaReceta.nombreReceta = this.nombreReceta;
      this.nuevaReceta.instrucciones = this.instrucciones;
      this.nuevaReceta.categoria.idCategoria = this.categoriaId;
      this.nuevaReceta.idRecetaIngrediente = 0; // Add this line
      this.apiService.createReceta(this.nuevaReceta).subscribe(() => {
        this.obtenerRecetas();
        this.nuevaReceta = { id: 0, nombreReceta: '', categoria: { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' }, instrucciones: '', fechaCreacion: '', fechaActualizacion: '', idRecetaIngrediente: 0 }; // Limpiar el formulario después de agregar
        this.nombreReceta = '';
        this.instrucciones = '';
        this.categoriaId = 0;
      });
    }
  }

  editarReceta(receta: Receta): void {
    this.recetaEditando = { ...receta }; // Crear una copia de la receta para editar
    this.nombreReceta = receta.nombreReceta;
    this.instrucciones = receta.instrucciones;
    this.categoriaId = receta.categoria.idCategoria;
  }

  cancelarEdicion(): void {
    this.recetaEditando = null;
    this.nombreReceta = '';
    this.instrucciones = '';
    this.categoriaId = 0;
  }

  eliminarReceta(id: number): void {
    this.apiService.deleteReceta(id).subscribe(() => this.obtenerRecetas());
  }
}