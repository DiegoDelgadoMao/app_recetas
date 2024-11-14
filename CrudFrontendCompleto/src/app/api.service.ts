import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './categorias/categoria'; // Importar la interfaz desde categoria.ts

export interface Ingrediente {
    idIngrediente: number;
    nombreIngrediente: string;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export interface Receta {
    idRecetaIngrediente: number;
    id: number;
    nombreReceta: string;
    categoria: Categoria;
    instrucciones: string;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export interface RecetaIngrediente {
    idRecetaIngrediente: number;
    receta: Receta;
    ingrediente: Ingrediente;
    cantidad: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:9000/api';

    constructor(private http: HttpClient) { }

    // Categorias
    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
    }

    getCategoria(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`);
    }

    createCategoria(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.apiUrl}/categorias`, categoria);
    }

    updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoria);
    }

    deleteCategoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`);
    }

    // Ingredientes
    getIngredientes(): Observable<Ingrediente[]> {
        return this.http.get<Ingrediente[]>(`${this.apiUrl}/ingredientes`);
    }

    getIngrediente(id: number): Observable<Ingrediente> {
        return this.http.get<Ingrediente>(`${this.apiUrl}/ingredientes/${id}`);
    }

    createIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
        return this.http.post<Ingrediente>(`${this.apiUrl}/ingredientes`, ingrediente);
    }

    updateIngrediente(id: number, ingrediente: Ingrediente): Observable<Ingrediente> {
        return this.http.put<Ingrediente>(`${this.apiUrl}/ingredientes/${id}`, ingrediente);
    }

    deleteIngrediente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/ingredientes/${id}`);
    }

    // Recetas
    getRecetas(): Observable<Receta[]> {
        return this.http.get<Receta[]>(`${this.apiUrl}/recetas`);
    }

    getReceta(id: number): Observable<Receta> {
        return this.http.get<Receta>(`${this.apiUrl}/recetas/${id}`);
    }

    createReceta(receta: Receta): Observable<Receta> {
        return this.http.post<Receta>(`${this.apiUrl}/recetas`, receta);
    }

    updateReceta(id: number, receta: Receta): Observable<Receta> {
        return this.http.put<Receta>(`${this.apiUrl}/recetas/${id}`, receta);
    }

    deleteReceta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/recetas/${id}`);
    }


    // RecetasIngredientes
    getRecetasIngredientes(): Observable<RecetaIngrediente[]> {
        return this.http.get<RecetaIngrediente[]>(`${this.apiUrl}/recetas-ingredientes`);
    }

    getRecetaIngrediente(id: number): Observable<RecetaIngrediente> {
        return this.http.get<RecetaIngrediente>(`${this.apiUrl}/recetas-ingredientes/${id}`);
    }

    createRecetaIngrediente(recetaIngrediente: RecetaIngrediente): Observable<RecetaIngrediente> {
        return this.http.post<RecetaIngrediente>(`${this.apiUrl}/recetas-ingredientes`, recetaIngrediente);
    }

    updateRecetaIngrediente(id: number, recetaIngrediente: RecetaIngrediente): Observable<RecetaIngrediente> {
        return this.http.put<RecetaIngrediente>(`${this.apiUrl}/recetas-ingredientes/${id}`, recetaIngrediente);
    }

    deleteRecetaIngrediente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/recetas-ingredientes/${id}`);
    }
}