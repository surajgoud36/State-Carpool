package com.example.state_carpool.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.dto.RouteRequest;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.Route;

@Component
public class RouteMapper {

	public Route toEntity(RouteRequest request, List<Destination> destinations) {
		if(request == null)
			return null;
		return new Route(request.getRouteType(), destinations);
	}
	
	public RouteResponse toDTO(Route route, List<DestinationResponse> destinationResponses) {
		if(route == null)
			return null;
		return new RouteResponse(route.getId(), route.getRouteType(), destinationResponses);
	}
}
