package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.dao.IRecetaDao;
import com.corhuila.basetareas.models.entity.Receta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RecetaServiceImpl implements IRecetaService {

    @Autowired
    private IRecetaDao recetaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Receta> findAll() {
        return (List<Receta>) recetaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Receta> findById(Integer id) {
        return recetaDao.findById(id);
    }

    @Override
    @Transactional
    public Receta save(Receta receta) {
        return recetaDao.save(receta);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        recetaDao.deleteById(id);
    }
}
