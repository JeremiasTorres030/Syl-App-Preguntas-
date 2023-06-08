package com.jeremias.server.app.models.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeremias.server.app.models.entity.Categoria;

@Service
public class CategoriaService implements ICategoriaService {

	@Autowired
	private ICategoriaDao categoriaDao;

	@Override
	@Transactional(readOnly = true)
	public List<Categoria> listAll() {
		return (List<Categoria>) categoriaDao.findAll();
	}

}
