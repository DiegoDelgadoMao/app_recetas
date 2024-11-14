package com.corhuila.basetareas.controllers;

import com.corhuila.basetareas.models.entity.Categoria;
import com.corhuila.basetareas.models.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaRestController {

    @Autowired
    private ICategoriaService categoriaService;

    // Obtener todas las categorías
    @GetMapping
    public List<Categoria> index() {
        return categoriaService.findAll();
    }

    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> show(@PathVariable Integer id) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        return categoria.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva categoría
    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody Categoria categoria) {
        Categoria newCategoria = categoriaService.save(categoria);
        return new ResponseEntity<>(newCategoria, HttpStatus.CREATED);
    }

    // Actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> update(@PathVariable Integer id, @RequestBody Categoria categoriaDetails) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        if (categoria.isPresent()) {
            Categoria categoriaToUpdate = categoria.get();
            categoriaToUpdate.setNombreCategoria(categoriaDetails.getNombreCategoria());
            categoriaToUpdate.setFechaActualizacion(categoriaDetails.getFechaActualizacion());
            categoriaService.save(categoriaToUpdate);
            return ResponseEntity.ok(categoriaToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        if (categoriaService.findById(id).isPresent()) {
            categoriaService.delete(id);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}