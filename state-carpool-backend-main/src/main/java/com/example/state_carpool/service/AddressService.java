package com.example.state_carpool.service;

import java.util.List;

import com.example.state_carpool.dto.AddressRequest;
import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.model.Address;

public interface AddressService {
	
	Address getAddress(Long id);
	
	AddressResponse saveAddress(AddressRequest addressDTO);
	
	AddressResponse fetchAddress(Long id);
	
	List<AddressResponse> fetchAddresses();
	
	AddressResponse updateAddress(AddressRequest addressDTO, Long id);
	
	void deleteAddress(Long id);
}
