package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.entity.Receta;

import java.util.List;
import java.util.Optional;

public interface IRecetaService {

    List<Receta> findAll();

    Optional<Receta> findById(Integer id);

    Receta save(Receta receta);

    void delete(Integer id);
}
