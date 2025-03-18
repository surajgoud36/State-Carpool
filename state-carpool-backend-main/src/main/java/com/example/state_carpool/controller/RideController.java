package com.example.state_carpool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.dto.DriverRidesRequest;
import com.example.state_carpool.dto.RideRequest;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.service.RideService;

@RestController
@RequestMapping("/rides")
public class RideController {
	
	@Autowired
	private RideService rideService;
	
	@GetMapping("/{id}")
	public RideResponse getRide(@PathVariable Long id) {
		return rideService.fetchRide(id);
	}
	
	@GetMapping
	public List<RideResponse> getRides() {
		return rideService.fetchRides();
	}
	
	@PostMapping("/driverrides")
	public List<RideResponse> fetchDriverRidesForToday(@RequestBody DriverRidesRequest request) {
		return rideService.fetchDriverRides(request);
	}
	
	@PostMapping
	public RideResponse addRide(@RequestBody RideRequest ride) {
		return rideService.createRide(ride);
	}
	
	@PutMapping("/{id}")
	public RideResponse updateRide(@RequestBody RideRequest ride, @PathVariable Long id) {
		return rideService.updateRide(ride, id);
	}
	
	@DeleteMapping("/{id}")
	public void removeRide(@PathVariable Long id) {
		rideService.deleteRide(id);
	}
}
