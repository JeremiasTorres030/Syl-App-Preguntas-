package com.jeremias.server.app.models.entity;

import java.util.List;

public class CustomResponseBody {
	private List<Long> ids;
	private int categoriaId;

	public CustomResponseBody() {

	}

	public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	public int getCategoriaId() {
		return categoriaId;
	}

	public void setCategoriaId(int categoriaId) {
		this.categoriaId = categoriaId;
	}

}
