package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.dao.IRecetaIngredienteDao;
import com.corhuila.basetareas.models.entity.RecetaIngrediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RecetaIngredienteServiceImpl implements IRecetaIngredienteService {

    @Autowired
    private IRecetaIngredienteDao recetaIngredienteDao;

    @Override
    @Transactional(readOnly = true)
    public List<RecetaIngrediente> findAll() {
        return (List<RecetaIngrediente>) recetaIngredienteDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RecetaIngrediente> findById(Integer id) {
        return recetaIngredienteDao.findById(id);
    }

    @Override
    @Transactional
    public RecetaIngrediente save(RecetaIngrediente recetaIngrediente) {
        return recetaIngredienteDao.save(recetaIngrediente);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        recetaIngredienteDao.deleteById(id);
    }
}
