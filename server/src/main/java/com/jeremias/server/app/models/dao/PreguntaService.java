package com.jeremias.server.app.models.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeremias.server.app.models.entity.Pregunta;

@Service
public class PreguntaService implements IPreguntaService {

	@Autowired
	private IPreguntaDao preguntaDao;

	@Override
	@Transactional(readOnly = true)
	public List<Pregunta> listAll() {
		return (List<Pregunta>) preguntaDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Pregunta findById(Long id) {
		return preguntaDao.findById(id).orElseGet(null);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Long> getAllIds() {
		return preguntaDao.getAllIds();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Long> getIdsByCategory(int categoriaId) {
		return preguntaDao.getIdsByCategory(categoriaId);
	}

}
