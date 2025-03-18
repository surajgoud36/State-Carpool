package com.example.state_carpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.state_carpool.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	Booking findBookingById(Long id);
	
	// Get all bookings that belong to a specific route
	@Query(nativeQuery = true, value = "Select DISTINCT b.id, b.rider_id, b.ride_type, b.destination_id from G2BOOKING b join G2Destination d on d.route_id = :routeId and d.ride_type = :rideType and d.id = b.destination_id")
	List<Booking> fetchBookingsForRoute(@Param("routeId") Long routeId, @Param("rideType") String rideType);
	
	// Get all bookings associated with a user
	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.rider_id = :userId and b.ride_id is not null and TO_DATE(b.date, 'MM/DD/YYYY') >= CURRENT_DATE")
	List<Booking> fetchUserUpcomingBookings(@Param("userId") Long userId);
	
	// Get all past bookings associated with a user
	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.rider_id = :userId and b.ride_id is not null and TO_DATE(b.date, 'MM/DD/YYYY') < CURRENT_DATE")
	List<Booking> fetchUserPastBookings(@Param("userId") Long userId);
	
	// Get all past bookings this month associated with a user
	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.rider_id = :userId and b.ride_id is not null and TO_DATE(b.date, 'MM/DD/YYYY') between CURRENT_DATE - (DAY(CURRENT_DATE)-1) and CURRENT_DATE-1")
	List<Booking> fetchUserPastBookingsThisMonth(@Param("userId") Long userId);
	
	// Get all bookings that are not associated with a ride
	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.ride_id is null")
	List<Booking> fetchScheduledBookings();

	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.ride_id = :rideId")
	List<Booking> fetchBookingsByRide(@Param("rideId") Long rideId);
	
	// Get booking for a user
	@Query(nativeQuery = true, value = "Select * from G2BOOKING b where b.rider_id = :userId and b.ride_type = :rideType and b.date = :date and b.destination_id = :destinationId")
	Booking fetchUserBooking(@Param("userId") Long userId, @Param("rideType") String rideType, @Param("date") String date, @Param("destinationId") Long destinationId);
}
