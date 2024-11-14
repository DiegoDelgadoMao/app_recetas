import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetasIngredientesComponent } from './recetas-ingredientes/recetas-ingredientes.component';

const routes: Routes = [
    { path: 'categorias', component: CategoriasComponent },
    { path: 'ingredientes', component: IngredientesComponent },
    { path: 'recetas', component: RecetasComponent },
    { path: 'recetas-ingredientes', component: RecetasIngredientesComponent },
    { path: '', redirectTo: '/categorias', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }