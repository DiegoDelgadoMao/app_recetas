package com.corhuila.basetareas.controllers;

import com.corhuila.basetareas.models.entity.Receta;
import com.corhuila.basetareas.models.service.IRecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recetas")
public class RecetaRestController {

    @Autowired
    private IRecetaService recetaService;

    // Obtener todas las recetas
    @GetMapping
    public List<Receta> index() {
        return recetaService.findAll();
    }

    // Obtener una receta por ID
    @GetMapping("/{id}")
    public ResponseEntity<Receta> show(@PathVariable Integer id) {
        Optional<Receta> receta = recetaService.findById(id);
        return receta.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva receta
    @PostMapping
    public ResponseEntity<Receta> create(@RequestBody Receta receta) {
        Receta newReceta = recetaService.save(receta);
        return new ResponseEntity<>(newReceta, HttpStatus.CREATED);
    }

    // Actualizar una receta existente
    @PutMapping("/{id}")
    public ResponseEntity<Receta> update(@PathVariable Integer id, @RequestBody Receta recetaDetails) {
        Optional<Receta> receta = recetaService.findById(id);
        if (receta.isPresent()) {
            Receta recetaToUpdate = receta.get();
            recetaToUpdate.setNombreReceta(recetaDetails.getNombreReceta());
            recetaToUpdate.setCategoria(recetaDetails.getCategoria());
            recetaToUpdate.setInstrucciones(recetaDetails.getInstrucciones());
            recetaToUpdate.setFechaActualizacion(recetaDetails.getFechaActualizacion());
            recetaService.save(recetaToUpdate);
            return ResponseEntity.ok(recetaToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una receta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (recetaService.findById(id).isPresent()) {
            recetaService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
