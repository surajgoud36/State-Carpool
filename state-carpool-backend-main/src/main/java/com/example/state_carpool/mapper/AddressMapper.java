package com.example.state_carpool.mapper;

import org.springframework.stereotype.Component;

import com.example.state_carpool.dto.AddressRequest;
import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.model.Address;

@Component
public class AddressMapper {
	
	public Address toEntity(AddressRequest addressDTO) {
		if(addressDTO == null)
			return null;
		
		return new Address(addressDTO.getStreet(), addressDTO.getCity(), addressDTO.getState(), addressDTO.getZipCode());
	}
	
	public AddressResponse toDTO(Address address) {
		if(address == null)
			return null;
		
		return new AddressResponse(address.getId(), address.getStreet(), address.getCity(), address.getState(), address.getZipCode());
	}
}
