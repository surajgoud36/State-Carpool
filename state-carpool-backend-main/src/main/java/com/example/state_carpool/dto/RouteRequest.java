package com.example.state_carpool.dto;

import java.util.List;

public class RouteRequest {
	
	private String routeType;
	private List<Long> destinationIds; // NOTE: - Make sure from the application level that no duplicate destinations are sent to the request
	
	public RouteRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RouteRequest(String routeType, List<Long> destinationIds) {
		super();
		this.routeType = routeType;
		this.destinationIds = destinationIds;
	}

	public String getRouteType() {
		return routeType;
	}

	public void setRouteType(String routeType) {
		this.routeType = routeType;
	}

	public List<Long> getDestinationIds() {
		return destinationIds;
	}

	public void setDestinationIds(List<Long> destinationIds) {
		this.destinationIds = destinationIds;
	}
	
}
