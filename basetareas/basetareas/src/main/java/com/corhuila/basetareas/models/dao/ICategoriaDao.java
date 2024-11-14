package com.corhuila.basetareas.models.dao;

import com.corhuila.basetareas.models.entity.Categoria;
import org.springframework.data.repository.CrudRepository;

public interface ICategoriaDao extends CrudRepository<Categoria, Integer> {
}
