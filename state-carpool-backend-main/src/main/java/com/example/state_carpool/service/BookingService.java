package com.example.state_carpool.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.BookingRequest;
import com.example.state_carpool.dto.BookingResponse;

@Service
public interface BookingService {
	
	BookingResponse createBooking(BookingRequest request);
	
	List<BookingResponse> fetchBookings();
	
	List<BookingResponse> fetchRideBookings(Long routeId, String rideType);
	
	BookingResponse fetchBooking(Long id);
	
	BookingResponse updateBooking(BookingRequest request, Long id);
	
	List<BookingResponse> fetchUserBookings(Long userId);
	
	List<BookingResponse> fetchUserPastBookings(Long userId);
	
	List<BookingResponse> fetchScheduledBookings();
	
	void deleteBooking(Long id);

	List<BookingResponse> fetchUserPastBookingsThisMonth(Long userId);

	List<BookingResponse> fetchBookingsByRide(Long rideId);

	boolean userBookingExists(BookingRequest request);
}
