package com.example.state_carpool.dto;

import java.util.List;

public class RouteResponse {
	private Long id;
	private String routeType;
	private List<DestinationResponse> destinations;
	
	
	public RouteResponse() {
		super();
		// TODO Auto-generated constructor stub
	}


	public RouteResponse(Long id, String routeType, List<DestinationResponse> destinations) {
		super();
		this.id = id;
		this.routeType = routeType;
		this.destinations = destinations;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getRouteType() {
		return routeType;
	}


	public void setRouteType(String routeType) {
		this.routeType = routeType;
	}


	public List<DestinationResponse> getDestinations() {
		return destinations;
	}


	public void setDestinations(List<DestinationResponse> destinations) {
		this.destinations = destinations;
	}
	
	
}
