package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.entity.Ingrediente;

import java.util.List;
import java.util.Optional;

public interface IIngredienteService {

    List<Ingrediente> findAll();

    Optional<Ingrediente> findById(Integer id);

    Ingrediente save(Ingrediente ingrediente);

    void delete(Integer id);
}