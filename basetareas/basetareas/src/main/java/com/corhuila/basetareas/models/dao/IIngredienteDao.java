package com.corhuila.basetareas.models.dao;

import com.corhuila.basetareas.models.entity.Ingrediente;
import org.springframework.data.repository.CrudRepository;

public interface IIngredienteDao extends CrudRepository<Ingrediente, Integer> {
}