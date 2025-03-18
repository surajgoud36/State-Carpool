package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.dto.DestinationRequest;
import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.model.Address;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.Route;

@Component
public class DestinationMapper {

	public Destination toEntity(DestinationRequest request, Address address) {
		if(request == null)
			return null;
		return new Destination(request.getName(), request.getPickupTime(), request.getDropoffTime(), request.getImage(), address);
	}
	
	public DestinationResponse toDTO(Destination destination, AddressResponse addressResponse) {
		if(destination == null)
			return null;
		return new DestinationResponse(destination.getId(), destination.getName(), destination.getPickupTime(), destination.getDropOffTime(), destination.getImage(), addressResponse);
	}
}
