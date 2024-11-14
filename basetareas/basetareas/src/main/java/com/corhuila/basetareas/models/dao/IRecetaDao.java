package com.corhuila.basetareas.models.dao;

import com.corhuila.basetareas.models.entity.Receta;
import org.springframework.data.repository.CrudRepository;

public interface IRecetaDao extends CrudRepository<Receta, Integer> {
}
