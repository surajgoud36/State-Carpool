package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.dto.DestinationRequest;
import com.example.state_carpool.dto.DestinationResponse;
import com.example.state_carpool.mapper.DestinationMapper;
import com.example.state_carpool.model.Address;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.repository.DestinationRepository;

@Service
public class DestinationServiceImpl implements DestinationService {
	
	private final DestinationRepository destinationRepository;
	private final DestinationMapper destinationMapper;
	private final AddressService addressService;
	
	@Autowired
	public DestinationServiceImpl(DestinationRepository destinationRepository, DestinationMapper destinationMapper,
			AddressService addressService) {
		super();
		this.destinationRepository = destinationRepository;
		this.destinationMapper = destinationMapper;
		this.addressService = addressService;
	}

	@Override
	public Destination getDestination(Long id) {
		return destinationRepository.findDestinationById(id);
	}
	
	@Override
	public List<Destination> getDestinations(List<Long> ids) {
		List<Destination> destinations = new ArrayList<>();
		for(Long destinationId : ids) {
			destinations.add(getDestination(destinationId));
		}
		return destinations;
	}
	
	@Override
	public List<DestinationResponse> retrieveDestinationResponses(List<Destination> destinations) {
		List<DestinationResponse> responses = new ArrayList<>();
		for(Destination destination : destinations)
			responses.add(findDestination(destination.getId()));
		return responses;
	}
	
	@Override
	public DestinationResponse createDestination(DestinationRequest request) {
		AddressResponse addressResponse = addressService.saveAddress(request.getAddress());
		Address address = addressService.getAddress(addressResponse.getId());
		
		Destination destination = destinationMapper.toEntity(request, address);
		Destination savedDestination = destinationRepository.save(destination);
		return destinationMapper.toDTO(savedDestination, addressResponse);
	}

	@Override
	public List<DestinationResponse> findDestinations() {
		List<Destination> destinations = destinationRepository.findAll();
		List<DestinationResponse> destinationResponses = new ArrayList<>();
		
		for(Destination destination : destinations) {
			destinationResponses.add(findDestination(destination.getId()));
		}
		
		return destinationResponses;
	}

	@Override
	public DestinationResponse findDestination(Long id) {
		Destination destination = destinationRepository.findDestinationById(id);
		AddressResponse addressResponse = destination.getAddress() != null ? addressService.fetchAddress(destination.getAddress().getId()) : null;
		return destinationMapper.toDTO(destination, addressResponse);
	}

	@Override
	public DestinationResponse updateDestination(DestinationRequest request, Long id) {
		Destination destination = destinationRepository.findDestinationById(id);
		destination.setName(request.getName());
		destination.setPickupTime(request.getPickupTime());
		destination.setDropOffTime(request.getDropoffTime());
		if(request.getImage() != null)
			destination.setImage(request.getImage());
		
		AddressResponse addressResponse = addressService.updateAddress(request.getAddress(), destination.getAddress().getId());
		Address updatedAddress = addressService.getAddress(addressResponse.getId());
		destination.setAddress(updatedAddress);
		
				
		Destination updatedDestination = destinationRepository.save(destination);
		return destinationMapper.toDTO(updatedDestination, addressResponse);
	}

	@Override
	public void deleteDestination(Long id) {
		destinationRepository.deleteById(id);	
	}

}
