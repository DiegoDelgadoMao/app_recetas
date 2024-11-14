package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.entity.Categoria;

import java.util.List;
import java.util.Optional;

public interface ICategoriaService {

    List<Categoria> findAll();

    Optional<Categoria> findById(Integer id);

    Categoria save(Categoria categoria);

    void delete(Integer id);
}
