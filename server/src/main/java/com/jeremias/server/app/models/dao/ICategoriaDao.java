package com.jeremias.server.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.jeremias.server.app.models.entity.Categoria;

public interface ICategoriaDao extends CrudRepository<Categoria, Long> {

}
