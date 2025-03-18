package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.dto.RouteRequest;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.model.Route;

public interface RouteService {
	RouteResponse createRoute(RouteRequest request);
	
	RouteResponse fetchRoute(Long id);
	
	List<RouteResponse> fetchRoutes();
	
	RouteResponse updateRoute(RouteRequest request, Long id);
	
	Route getRoute(Long id);
	
	void deleteRoute(Long id);
}
