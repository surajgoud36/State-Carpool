package com.example.state_carpool.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.DriverRidesRequest;
import com.example.state_carpool.dto.RideRequest;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.model.Booking;
import com.example.state_carpool.model.Ride;

@Service
public interface RideService {
	
	RideResponse createRide(RideRequest request);
	
	RideResponse fetchRide(Long id);
	
	List<RideResponse> fetchRides();
	
	List<RideResponse> fetchDriverRides(DriverRidesRequest request);
	
	RideResponse updateRide(RideRequest request, Long id);
	
	Ride getRide(Long id);
	
	void removeBooking(Booking booking, Long rideId);
	
	void deleteRide(Long id);
}
