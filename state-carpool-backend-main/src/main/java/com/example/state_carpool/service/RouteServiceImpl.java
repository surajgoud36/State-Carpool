package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.RouteRequest;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.mapper.RouteMapper;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.Route;
import com.example.state_carpool.repository.RouteRepository;

@Service
public class RouteServiceImpl implements RouteService {
	
	private final RouteRepository routeRepository;
	private final RouteMapper routeMapper;
	private final DestinationService destinationService;
	
	@Autowired
	public RouteServiceImpl(RouteRepository routeRepository, RouteMapper routeMapper,
			DestinationService destinationService) {
		super();
		this.routeRepository = routeRepository;
		this.routeMapper = routeMapper;
		this.destinationService = destinationService;
	}

	@Override
	public RouteResponse createRoute(RouteRequest request) {
		List<Destination> destinations = destinationService.getDestinations(request.getDestinationIds());
		
		Route newRoute = routeMapper.toEntity(request, destinations);
		Route savedRoute = routeRepository.save(newRoute);
		
		return routeMapper.toDTO(savedRoute, destinationService.retrieveDestinationResponses(destinations));
	}
	
	@Override
	public RouteResponse fetchRoute(Long id) {
		Route route = routeRepository.findRouteById(id);
		return routeMapper.toDTO(route, destinationService.retrieveDestinationResponses(route.getDestinations()));
	}

	@Override
	public List<RouteResponse> fetchRoutes() {
		List<RouteResponse> responses = new ArrayList<>();
		List<Route> routes = routeRepository.findAll();
		for(Route route : routes)
			responses.add(fetchRoute(route.getId()));
		return responses;
	}

	@Override
	public RouteResponse updateRoute(RouteRequest request, Long id) {
		Route existingRoute = routeRepository.findRouteById(id);
		existingRoute.setRouteType(request.getRouteType());	
		
		
		List<Destination> destinations = destinationService.getDestinations(request.getDestinationIds());
		
		existingRoute.clearDestinations();
		for(Destination destination : destinations) {
			existingRoute.addDestination(destination);
		}
		
		Route savedRoute = routeRepository.save(existingRoute);
		
		return routeMapper.toDTO(savedRoute, destinationService.retrieveDestinationResponses(savedRoute.getDestinations()));
	}
	
	@Override
	public Route getRoute(Long id) {
		return routeRepository.findRouteById(id);
	}

	@Override
	public void deleteRoute(Long id) {
		routeRepository.deleteById(id);
	}

}
