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

import com.example.state_carpool.dto.AddressRequest;
import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@GetMapping("/{id}")
	public AddressResponse getAddress(@PathVariable Long id) {
		return addressService.fetchAddress(id);
	}
	
	@GetMapping
	public List<AddressResponse> getAllAddress() {
		return addressService.fetchAddresses();
	}
	
	@PostMapping
	public AddressResponse addAddress(@RequestBody AddressRequest address) {
		return addressService.saveAddress(address);
	}
	
	@PutMapping("/{id}")
	public AddressResponse updateAddress(@RequestBody AddressRequest address, @PathVariable Long id) {
		return addressService.updateAddress(address, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAddress(@PathVariable Long id) {
		addressService.deleteAddress(id);
	}
}
