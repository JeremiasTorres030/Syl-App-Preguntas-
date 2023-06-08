package com.jeremias.server.app.models.dao;

import java.util.List;

import com.jeremias.server.app.models.entity.Pregunta;

public interface IPreguntaService {

	public List<Pregunta> listAll();

	public Pregunta findById(Long id);

	public List<Long> getAllIds();

	public List<Long> getIdsByCategory(int categoriaId);
}
