package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.entity.RecetaIngrediente;

import java.util.List;
import java.util.Optional;

public interface IRecetaIngredienteService {

    List<RecetaIngrediente> findAll();

    Optional<RecetaIngrediente> findById(Integer id);

    RecetaIngrediente save(RecetaIngrediente recetaIngrediente);

    void delete(Integer id);
}
