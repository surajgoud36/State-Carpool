package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
	Address findAddressById(Long id);
}
