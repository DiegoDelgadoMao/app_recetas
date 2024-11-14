package com.corhuila.basetareas.models.service;

import com.corhuila.basetareas.models.dao.ICategoriaDao;
import com.corhuila.basetareas.models.entity.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements ICategoriaService {

    @Autowired
    private ICategoriaDao categoriaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Categoria> findAll() {
        return (List<Categoria>) categoriaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Categoria> findById(Integer id) {
        return categoriaDao.findById(id);
    }

    @Override
    @Transactional
    public Categoria save(Categoria categoria) {
        return categoriaDao.save(categoria);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        categoriaDao.deleteById(id);
    }
}
