package com.example.state_carpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Ride;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
	Ride findRideById(Long id);
	
	@Query(nativeQuery = true, value = "SELECT * FROM G2RIDE r where r.driver_id = :driverId and TO_DATE(r.date, 'MM/DD/YYYY') >= CURRENT_DATE")
	List<Ride> fetchDriverRides(@Param("driverId") Long driverId);
	
}
