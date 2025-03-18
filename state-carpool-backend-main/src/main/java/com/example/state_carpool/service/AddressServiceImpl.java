package com.example.state_carpool.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.AddressRequest;
import com.example.state_carpool.dto.AddressResponse;
import com.example.state_carpool.mapper.AddressMapper;
import com.example.state_carpool.model.Address;
import com.example.state_carpool.repository.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {
	
	private final AddressRepository addressRepository;
	private final AddressMapper addressMapper;
	
	@Autowired
	public AddressServiceImpl(AddressRepository addressRepository, AddressMapper addressMapper) {
		super();
		this.addressRepository = addressRepository;
		this.addressMapper = addressMapper;
	}
	
	@Override
	public Address getAddress(Long id) {
		return addressRepository.findAddressById(id);
	}
	
	@Override
	public AddressResponse saveAddress(AddressRequest addressDTO) {
		Address address = addressMapper.toEntity(addressDTO);
		Address savedAddress = addressRepository.save(address);
		return addressMapper.toDTO(savedAddress);
	}

	@Override
	public AddressResponse fetchAddress(Long id) {
		Address address = addressRepository.findAddressById(id);
		return addressMapper.toDTO(address);
	}

	@Override
	public List<AddressResponse> fetchAddresses() {
		return addressRepository.findAll().stream().map(addressMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public AddressResponse updateAddress(AddressRequest addressDTO, Long id) {
		Address existingAddress = addressRepository.findAddressById(id);
		existingAddress.setCity(addressDTO.getCity());
		existingAddress.setState(addressDTO.getState());
		existingAddress.setStreet(addressDTO.getStreet());
		existingAddress.setZipCode(addressDTO.getZipCode());
		Address updatedAddress = addressRepository.save(existingAddress);
		return addressMapper.toDTO(updatedAddress);
	}

	@Override
	public void deleteAddress(Long id) {
		addressRepository.deleteById(id);
	}

}
