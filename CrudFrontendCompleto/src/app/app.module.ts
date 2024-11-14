import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetasIngredientesComponent } from './recetas-ingredientes/recetas-ingredientes.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoriasComponent,
        IngredientesComponent,
        RecetasComponent,
        RecetasIngredientesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }