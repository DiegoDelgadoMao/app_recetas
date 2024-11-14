import { Component, OnInit } from '@angular/core';
import { ApiService, Ingrediente } from '../api.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  nuevoIngrediente: Ingrediente = { idIngrediente: 0, nombreIngrediente: '', fechaCreacion: '', fechaActualizacion: '' };
  ingredienteEditando: Ingrediente | null = null;
  nombreIngrediente: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  obtenerIngredientes(): void {
    this.apiService.getIngredientes().subscribe((ingredientes: Ingrediente[]) => {
      this.ingredientes = ingredientes;
    });
  }

  agregarIngrediente(): void {
    if (this.ingredienteEditando) {
      this.ingredienteEditando.nombreIngrediente = this.nombreIngrediente;
      this.apiService.updateIngrediente(this.ingredienteEditando.idIngrediente, this.ingredienteEditando).subscribe(() => {
        this.obtenerIngredientes();
        this.ingredienteEditando = null; // Limpiar el formulario después de editar
        this.nombreIngrediente = '';
      });
    } else {
      this.nuevoIngrediente.nombreIngrediente = this.nombreIngrediente;
      this.apiService.createIngrediente(this.nuevoIngrediente).subscribe(() => {
        this.obtenerIngredientes();
        this.nuevoIngrediente = { idIngrediente: 0, nombreIngrediente: '', fechaCreacion: '', fechaActualizacion: '' }; // Limpiar el formulario después de agregar
        this.nombreIngrediente = '';
      });
    }
  }

  editarIngrediente(ingrediente: Ingrediente): void {
    this.ingredienteEditando = { ...ingrediente }; // Crear una copia del ingrediente para editar
    this.nombreIngrediente = ingrediente.nombreIngrediente;
  }

  cancelarEdicion(): void {
    this.ingredienteEditando = null;
    this.nombreIngrediente = '';
  }

  eliminarIngrediente(id: number): void {
    this.apiService.deleteIngrediente(id).subscribe(() => this.obtenerIngredientes());
  }
}