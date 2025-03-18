package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.dto.DestinationRequest;
import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.Route;

public interface DestinationService {
	
	DestinationResponse createDestination(DestinationRequest request);
	
	List<DestinationResponse> retrieveDestinationResponses(List<Destination> destinations);
	
	List<Destination> getDestinations(List<Long> ids);
	
	List<DestinationResponse> findDestinations();
	
	DestinationResponse findDestination(Long id);
	
	DestinationResponse updateDestination(DestinationRequest request, Long id);
		
	Destination getDestination(Long id);
	
	void deleteDestination(Long id);
}
