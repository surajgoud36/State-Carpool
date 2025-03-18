package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.BookingRequest;
import com.example.state_carpool.dto.BookingResponse;
import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.model.Booking;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.Ride;
import com.example.state_carpool.model.User;

@Component
public class BookingMapper {
	
	public Booking toEntity(BookingRequest request, Destination destination, User rider, Ride ride) {
		if(request == null)
			return null;
		return new Booking(request.getRideType(), destination, rider, request.getDate(), request.getCreatedAt(), ride);
	}

	public BookingResponse toDTO(Booking booking, DestinationResponse destinationResponse, UserResponse userResponse, RideResponse rideResponse) {
		if(booking == null)
			return null;
		return new BookingResponse(booking.getId(), booking.getRideType(), destinationResponse, userResponse, booking.getDate(), booking.getCreatedAt(), rideResponse);
	}
}
