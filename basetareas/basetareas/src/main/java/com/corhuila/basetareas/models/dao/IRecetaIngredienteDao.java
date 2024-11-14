package com.corhuila.basetareas.models.dao;

import com.corhuila.basetareas.models.entity.RecetaIngrediente;
import org.springframework.data.repository.CrudRepository;

public interface IRecetaIngredienteDao extends CrudRepository<RecetaIngrediente, Integer> {
}