package com.example.state_carpool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
	Chat findChatById(Long id);
	
	@Query(nativeQuery = true, value = "SELECT * FROM G2CHAT c where c.rider_id = :riderId and c.driver_id = :driverId and c.ride_id = :rideId")
	Chat chatExists(@Param("riderId") Long riderId, @Param("driverId") Long driverId, @Param("rideId") Long rideId);
}
