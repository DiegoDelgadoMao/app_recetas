import { Component, OnInit } from '@angular/core';
import { ApiService, Receta, Ingrediente, RecetaIngrediente } from '../api.service';

@Component({
  selector: 'app-recetas-ingredientes',
  templateUrl: './recetas-ingredientes.component.html',
  styleUrls: ['./recetas-ingredientes.component.css']
})
export class RecetasIngredientesComponent implements OnInit {
  recetasIngredientes: RecetaIngrediente[] = [];
  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];
  nuevaRecetaIngrediente: RecetaIngrediente = { idRecetaIngrediente: 0, receta: {
    id: 0, nombreReceta: '', categoria: { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' }, instrucciones: '', fechaCreacion: '', fechaActualizacion: '',
    idRecetaIngrediente: 0
  }, ingrediente: { idIngrediente: 0, nombreIngrediente: '', fechaCreacion: '', fechaActualizacion: '' }, cantidad: '' };
  recetaIngredienteEditando: RecetaIngrediente | null = null;
  recetaId: number = 0;
  ingredienteId: number = 0;
  cantidad: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerRecetasIngredientes();
    this.obtenerRecetas();
    this.obtenerIngredientes();
  }

  obtenerRecetasIngredientes(): void {
    this.apiService.getRecetasIngredientes().subscribe((recetasIngredientes: RecetaIngrediente[]) => {
      this.recetasIngredientes = recetasIngredientes;
    });
  }

  obtenerRecetas(): void {
    this.apiService.getRecetas().subscribe((recetas: Receta[]) => {
      this.recetas = recetas;
    });
  }

  obtenerIngredientes(): void {
    this.apiService.getIngredientes().subscribe((ingredientes: Ingrediente[]) => {
      this.ingredientes = ingredientes;
    });
  }

  agregarRecetaIngrediente(): void {
    if (this.recetaIngredienteEditando) {
      this.recetaIngredienteEditando.receta.id = this.recetaId;
      this.recetaIngredienteEditando.ingrediente.idIngrediente = this.ingredienteId;
      this.recetaIngredienteEditando.cantidad = this.cantidad;
      this.apiService.updateRecetaIngrediente(this.recetaIngredienteEditando.idRecetaIngrediente, this.recetaIngredienteEditando).subscribe(() => {
        this.obtenerRecetasIngredientes();
        this.recetaIngredienteEditando = null; // Limpiar el formulario después de editar
        this.recetaId = 0;
        this.ingredienteId = 0;
        this.cantidad = '';
      });
    } else {
      this.nuevaRecetaIngrediente.receta.id = this.recetaId;
      this.nuevaRecetaIngrediente.ingrediente.idIngrediente = this.ingredienteId;
      this.nuevaRecetaIngrediente.cantidad = this.cantidad;
      this.apiService.createRecetaIngrediente(this.nuevaRecetaIngrediente).subscribe(() => {
        this.obtenerRecetasIngredientes();
        this.nuevaRecetaIngrediente = { idRecetaIngrediente: 0, receta: {
          id: 0, nombreReceta: '', categoria: { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' }, instrucciones: '', fechaCreacion: '', fechaActualizacion: '',
          idRecetaIngrediente: 0
        }, ingrediente: { idIngrediente: 0, nombreIngrediente: '', fechaCreacion: '', fechaActualizacion: '' }, cantidad: '' }; // Limpiar el formulario después de agregar
        this.recetaId = 0;
        this.ingredienteId = 0;
        this.cantidad = '';
      });
    }
  }

  editarRecetaIngrediente(recetaIngrediente: RecetaIngrediente): void {
    this.recetaIngredienteEditando = { ...recetaIngrediente }; // Crear una copia de la relación para editar
    this.recetaId = recetaIngrediente.receta.id;
    this.ingredienteId = recetaIngrediente.ingrediente.idIngrediente;
    this.cantidad = recetaIngrediente.cantidad;
  }

  cancelarEdicion(): void {
    this.recetaIngredienteEditando = null;
    this.recetaId = 0;
    this.ingredienteId = 0;
    this.cantidad = '';
  }

  eliminarRecetaIngrediente(id: number): void {
    this.apiService.deleteRecetaIngrediente(id).subscribe(() => this.obtenerRecetasIngredientes());
  }
}