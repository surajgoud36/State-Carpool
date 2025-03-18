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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.state_carpool.dto.BookingRequest;
import com.example.state_carpool.dto.BookingResponse;
import com.example.state_carpool.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {
	
	@Autowired 
	private BookingService bookingService;
	
	@GetMapping("/{id}")
	public BookingResponse getRide(@PathVariable Long id) {
		return bookingService.fetchBooking(id);
	}

	@GetMapping
	public List<BookingResponse> getRides() {
		return bookingService.fetchBookings();
	}
	
	@GetMapping("/routebookings")
	public List<BookingResponse> getRidesByRoute(@RequestParam Long routeId, @RequestParam String routeType) {
		return bookingService.fetchRideBookings(routeId, routeType);
	}
	
	@GetMapping("/user/{userId}")
	public List<BookingResponse> getBookingsForUser(@PathVariable Long userId) {
		return bookingService.fetchUserBookings(userId);
	}

	@GetMapping("/rides/{id}")
	public List<BookingResponse> getBookingsFromRide(@PathVariable Long id) { return bookingService.fetchBookingsByRide(id); }

	@GetMapping("/previous/user/{userId}")
	public List<BookingResponse> getPastBookingsForUser(@PathVariable Long userId) {
		return bookingService.fetchUserPastBookings(userId);
	}
	
	@GetMapping("/previousmonth/user/{userId}")
	public List<BookingResponse> getPastMonthlyBookingsForUser(@PathVariable Long userId) {
		return bookingService.fetchUserPastBookingsThisMonth(userId);
	}
	
	@GetMapping("/scheduled")
	public List<BookingResponse> getScheduledBookings() {
		return bookingService.fetchScheduledBookings();
	}
	
	@PostMapping("/userbookingexists")
	public boolean checkBookingExistsForUser(@RequestBody BookingRequest request) {
		return bookingService.userBookingExists(request);
	}
	
	@PostMapping
	public BookingResponse addRide(@RequestBody BookingRequest ride) {
		return bookingService.createBooking(ride);
	}
	
	@PutMapping("/{id}")
	public BookingResponse updateRide(@RequestBody BookingRequest ride, @PathVariable Long id) {
		return bookingService.updateBooking(ride, id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteRide(@PathVariable Long id) {
		bookingService.deleteBooking(id);
	}
}
