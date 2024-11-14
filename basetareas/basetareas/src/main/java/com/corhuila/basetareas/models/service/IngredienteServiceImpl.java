package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.dao.IIngredienteDao;
import com.corhuila.basetareas.models.entity.Ingrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class IngredienteServiceImpl implements IIngredienteService {

    @Autowired
    private IIngredienteDao ingredienteDao;

    @Override
    @Transactional(readOnly = true)
    public List<Ingrediente> findAll() {
        return (List<Ingrediente>) ingredienteDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Ingrediente> findById(Integer id) {
        return ingredienteDao.findById(id);
    }

    @Override
    @Transactional
    public Ingrediente save(Ingrediente ingrediente) {
        return ingredienteDao.save(ingrediente);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        ingredienteDao.deleteById(id);
    }
}