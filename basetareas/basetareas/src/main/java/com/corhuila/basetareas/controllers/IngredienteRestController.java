package com.corhuila.basetareas.controllers;

import com.corhuila.basetareas.models.entity.Ingrediente;
import com.corhuila.basetareas.models.service.IIngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ingredientes")
public class IngredienteRestController {

    @Autowired
    private IIngredienteService ingredienteService;

    // Obtener todos los ingredientes
    @GetMapping
    public List<Ingrediente> index() {
        return ingredienteService.findAll();
    }

    // Obtener un ingrediente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> show(@PathVariable Integer id) {
        Optional<Ingrediente> ingrediente = ingredienteService.findById(id);
        return ingrediente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo ingrediente
    @PostMapping
    public ResponseEntity<Ingrediente> create(@RequestBody Ingrediente ingrediente) {
        Ingrediente newIngrediente = ingredienteService.save(ingrediente);
        return new ResponseEntity<>(newIngrediente, HttpStatus.CREATED);
    }

    // Actualizar un ingrediente existente
    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> update(@PathVariable Integer id, @RequestBody Ingrediente ingredienteDetails) {
        Optional<Ingrediente> ingrediente = ingredienteService.findById(id);
        if (ingrediente.isPresent()) {
            Ingrediente ingredienteToUpdate = ingrediente.get();
            ingredienteToUpdate.setNombreIngrediente(ingredienteDetails.getNombreIngrediente());
            ingredienteToUpdate.setFechaActualizacion(ingredienteDetails.getFechaActualizacion());
            ingredienteService.save(ingredienteToUpdate);
            return ResponseEntity.ok(ingredienteToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        if (ingredienteService.findById(id).isPresent()) {
            ingredienteService.delete(id);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
