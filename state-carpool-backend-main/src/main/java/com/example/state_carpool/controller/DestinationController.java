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

import com.example.state_carpool.dto.DestinationRequest;
import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.service.DestinationService;

@RestController
@RequestMapping("/destinations")
public class DestinationController {
	
	@Autowired
	private DestinationService destinationService;
	
	@GetMapping("/{id}")
	public DestinationResponse getDestination(@PathVariable Long id) {
		return destinationService.findDestination(id);
	}
	
	@GetMapping
	public List<DestinationResponse> getDestinations() {
		return destinationService.findDestinations();
	}
	
	@PostMapping
	public DestinationResponse addDestination(@RequestBody DestinationRequest destination) {
		return destinationService.createDestination(destination);
	}
	
	@PutMapping("/{id}")
	public DestinationResponse updateDestination(@RequestBody DestinationRequest destination, @PathVariable Long id) {
		return destinationService.updateDestination(destination, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteDestination(@PathVariable Long id) {
		destinationService.deleteDestination(id);
	}
}
