import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Categoria } from './categoria'; // Importar la interfaz desde categoria.ts

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
    categorias: Categoria[] = [];
    nuevaCategoria: Categoria = { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' };
    categoriaEditando: Categoria | null = null;
    nombreCategoria: string = '';

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.obtenerCategorias();
    }

    obtenerCategorias(): void {
        this.apiService.getCategorias().subscribe((categorias: Categoria[]) => {
            this.categorias = categorias;
        });
    }

    agregarCategoria(): void {
        if (this.categoriaEditando) {
            this.categoriaEditando.nombreCategoria = this.nombreCategoria;
            this.apiService.updateCategoria(this.categoriaEditando.idCategoria, this.categoriaEditando).subscribe(() => {
                this.obtenerCategorias();
                this.categoriaEditando = null; // Limpiar el formulario después de editar
                this.nombreCategoria = '';
            });
        } else {
            this.nuevaCategoria.nombreCategoria = this.nombreCategoria;
            this.apiService.createCategoria(this.nuevaCategoria).subscribe(() => {
                this.obtenerCategorias();
                this.nuevaCategoria = { idCategoria: 0, nombreCategoria: '', fechaCreacion: '', fechaActualizacion: '' }; // Limpiar el formulario después de agregar
                this.nombreCategoria = '';
            });
        }
    }

    editarCategoria(categoria: Categoria): void {
        this.categoriaEditando = { ...categoria }; // Crear una copia de la categoría para editar
        this.nombreCategoria = categoria.nombreCategoria;
    }

    cancelarEdicion(): void {
        this.categoriaEditando = null;
        this.nombreCategoria = '';
    }

    eliminarCategoria(id: number): void {
        this.apiService.deleteCategoria(id).subscribe(() => this.obtenerCategorias());
    }
}