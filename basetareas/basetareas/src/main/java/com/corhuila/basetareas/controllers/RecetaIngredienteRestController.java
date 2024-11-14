package com.corhuila.basetareas.controllers;

import com.corhuila.basetareas.models.entity.RecetaIngrediente;
import com.corhuila.basetareas.models.service.IRecetaIngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recetas-ingredientes")
public class RecetaIngredienteRestController {

    @Autowired
    private IRecetaIngredienteService recetaIngredienteService;

    // Obtener todas las relaciones receta-ingrediente
    @GetMapping
    public List<RecetaIngrediente> index() {
        return recetaIngredienteService.findAll();
    }

    // Obtener una relación receta-ingrediente por ID
    @GetMapping("/{id}")
    public ResponseEntity<RecetaIngrediente> show(@PathVariable Integer id) {
        Optional<RecetaIngrediente> recetaIngrediente = recetaIngredienteService.findById(id);
        return recetaIngrediente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva relación receta-ingrediente
    @PostMapping
    public ResponseEntity<RecetaIngrediente> create(@RequestBody RecetaIngrediente recetaIngrediente) {
        RecetaIngrediente newRecetaIngrediente = recetaIngredienteService.save(recetaIngrediente);
        return new ResponseEntity<>(newRecetaIngrediente, HttpStatus.CREATED);
    }

    // Actualizar una relación receta-ingrediente existente
    @PutMapping("/{id}")
    public ResponseEntity<RecetaIngrediente> update(@PathVariable Integer id, @RequestBody RecetaIngrediente recetaIngredienteDetails) {
        Optional<RecetaIngrediente> recetaIngrediente = recetaIngredienteService.findById(id);
        if (recetaIngrediente.isPresent()) {
            RecetaIngrediente recetaIngredienteToUpdate = recetaIngrediente.get();
            recetaIngredienteToUpdate.setReceta(recetaIngredienteDetails.getReceta());
            recetaIngredienteToUpdate.setIngrediente(recetaIngredienteDetails.getIngrediente());
            recetaIngredienteToUpdate.setCantidad(recetaIngredienteDetails.getCantidad());
            recetaIngredienteService.save(recetaIngredienteToUpdate);
            return ResponseEntity.ok(recetaIngredienteToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una relación receta-ingrediente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (recetaIngredienteService.findById(id).isPresent()) {
            recetaIngredienteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}