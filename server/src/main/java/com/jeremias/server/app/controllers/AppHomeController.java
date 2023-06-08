package com.jeremias.server.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppHomeController {

	@GetMapping("/")
	public String index() {
		return "index.html";
	}

}
