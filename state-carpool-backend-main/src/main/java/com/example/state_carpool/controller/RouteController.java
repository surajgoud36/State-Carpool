package com.example.state_carpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.dto.RouteRequest;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.service.RouteService;

@RestController
@RequestMapping("/routes")
public class RouteController {
	
	@Autowired
	private RouteService routeService;
	
	@GetMapping("/{id}")
	public RouteResponse getRoute(@PathVariable Long id) {
		return routeService.fetchRoute(id);
	}
	
	@GetMapping
	public List<RouteResponse> getRoutes() {
		return routeService.fetchRoutes();
	}
	
	@PostMapping
	public RouteResponse addRoute(@RequestBody RouteRequest route) {
		return routeService.createRoute(route);
	}
	
	@PutMapping("/{id}")
	public RouteResponse updateRoute(@RequestBody RouteRequest route, @PathVariable Long id) {
		return routeService.updateRoute(route, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteRoute(@PathVariable Long id) {
		routeService.deleteRoute(id);
	}
}
