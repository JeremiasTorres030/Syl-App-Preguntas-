package com.jeremias.server.app.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.jeremias.server.app.models.dao.ICategoriaDao;
import com.jeremias.server.app.models.dao.IPreguntaDao;
import com.jeremias.server.app.models.entity.Categoria;
import com.jeremias.server.app.models.entity.CustomResponseBody;
import com.jeremias.server.app.models.entity.Pregunta;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "https://ambitious-wheel-production.up.railway.app" })
public class AppRestController {

	@Autowired
	private IPreguntaDao serviceP;

	@Autowired
	private ICategoriaDao serviceC;

	@GetMapping("/preguntas")
	public List<Pregunta> listarPreguntas() {
		return (List<Pregunta>) serviceP.findAll();
	}

	@GetMapping("/categorias")
	public ResponseEntity<?> listarCategorias() {
		Map<String, Object> res = new HashMap<>();
		try {
			List<Categoria> categorias = (List<Categoria>) serviceC.findAll();
			res.put("categorias", categorias);
			res.put("ok", "true");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
		} catch (Exception e) {
			res.put("ok", "false");
			res.put("msg", "Ha ocurrido un error en el servidor");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/pregunta")
	public ResponseEntity<?> pregunta(@RequestBody CustomResponseBody body) {
		Map<String, Object> res = new HashMap<>();
		try {
			Random random = new Random();
			Long randomNum = null;
			Long maxNum = null;
			if (body.getIds().size() == 0) {
				List<Long> ids = serviceP.getAllIds();
				maxNum = Collections.max(ids);
				randomNum = random.nextLong(maxNum) + 1L;
				Pregunta pregunta = serviceP.findById(randomNum).orElse(null);
				res.put("ok", "true");
				res.put("pregunta", pregunta);
				res.put("ids", ids);
				return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
			}
			List<Long> ids = body.getIds();
			maxNum = Collections.max(ids);
			do {
				randomNum = random.nextLong(maxNum) + 1L;
			} while (!ids.contains(randomNum));
			Pregunta pregunta = serviceP.findById(randomNum).orElse(null);
			res.put("ok", "true");
			res.put("pregunta", pregunta);
			res.put("ids", ids);
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
		} catch (Exception e) {
			res.put("ok", "false");
			res.put("msg", "Ha ocurrido un error en el servidor");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/categoria")
	public ResponseEntity<?> categoria(@RequestBody CustomResponseBody body) {
		Map<String, Object> res = new HashMap<>();
		if (body.getCategoriaId() == 0) {
			res.put("ok", "false");
			res.put("msg", "Falta el id de la categoria");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		try {
			Random random = new Random();
			Long randomNum = null;
			Long maxNum = null;
			if (body.getIds().size() == 0) {
				List<Long> ids = serviceP.getIdsByCategory(body.getCategoriaId());
				maxNum = Collections.max(ids);
				do {
					randomNum = random.nextLong(maxNum) + 1L;
				} while (!ids.contains(randomNum));
				Pregunta pregunta = serviceP.findById(randomNum).orElse(null);
				res.put("ok", "true");
				res.put("pregunta", pregunta);
				res.put("ids", ids);
				return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
			}
			List<Long> ids = body.getIds();
			maxNum = Collections.max(ids);
			do {
				randomNum = random.nextLong(maxNum) + 1L;
			} while (!ids.contains(randomNum));
			Pregunta pregunta = serviceP.findById(randomNum).orElse(null);
			res.put("ok", "true");
			res.put("pregunta", pregunta);
			res.put("ids", ids);
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
		} catch (Exception e) {
			res.put("ok", "false");
			res.put("msg", "Ha ocurrido un error en el servidor");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
