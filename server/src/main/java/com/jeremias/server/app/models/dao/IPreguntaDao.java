package com.jeremias.server.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.jeremias.server.app.models.entity.Pregunta;

public interface IPreguntaDao extends CrudRepository<Pregunta, Long> {

	@Query("select p.id from Pregunta p")
	public List<Long> getAllIds();

	@Query("select p.id from Pregunta p where p.categoria= ?1")
	public List<Long> getIdsByCategory(int categoriaId);

}
