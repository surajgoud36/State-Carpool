package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Destination;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
	Destination findDestinationById(Long id);
}
