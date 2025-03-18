package com.example.state_carpool.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.RideRequest;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.dto.RouteResponse;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.model.Booking;
import com.example.state_carpool.model.Ride;
import com.example.state_carpool.model.Route;
import com.example.state_carpool.model.User;

@Component
public class RideMapper {
	
	public Ride toEntity(RideRequest request, List<Booking> bookings, User driver, Route route) {
		if(request == null)
			return null;
		return new Ride(request.getDate(), request.getCreatedAt(), bookings, driver, route);
	}
	
	public RideResponse toDTO(Ride ride, List<UserResponse> passengers, UserResponse driver, RouteResponse route) {
		if(ride == null)
			return null;
		return new RideResponse(ride.getId(), ride.getDate(), ride.getCreatedAt(), passengers, driver, route);
	}
}
