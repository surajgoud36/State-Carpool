package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.BookingRequest;
import com.example.state_carpool.dto.BookingResponse;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.mapper.BookingMapper;
import com.example.state_carpool.model.Booking;
import com.example.state_carpool.model.Destination;
import com.example.state_carpool.model.User;
import com.example.state_carpool.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService {
	
	
	private final BookingRepository bookingRepository;
	private final BookingMapper bookingMapper;
	private final DestinationService destinationService;
	private final UserService userService;
	private final RideService rideService;

	@Autowired
	public BookingServiceImpl(BookingRepository bookingRepository, BookingMapper bookingMapper,
			DestinationService destinationService, UserService userService, RideService rideService) {
		super();
		this.bookingRepository = bookingRepository;
		this.bookingMapper = bookingMapper;
		this.destinationService = destinationService;
		this.userService = userService;
		this.rideService = rideService;
	}
	
	@Override
	public BookingResponse createBooking(BookingRequest request) {
		Destination destination = destinationService.getDestination(request.getDestinationId());
		User rider = userService.getUser(request.getRiderId());
		Booking newBooking = bookingMapper.toEntity(request, destination, rider, null);
		System.out.println("New: " + newBooking);
		Booking savedBooking = bookingRepository.save(newBooking);
		System.out.println("Saved: " + savedBooking);
		return bookingMapper.toDTO(savedBooking, destinationService.findDestination(savedBooking.getScheduledDestination().getId()),
				userService.fetchUser(savedBooking.getRider().getId()), null);
	}
	
	@Override
	public BookingResponse fetchBooking(Long id) {
		Booking booking = bookingRepository.findBookingById(id);
		if(booking == null)
			return null;
		RideResponse rideResponse = booking.getRide() != null ? rideService.fetchRide(booking.getRide().getId()) : null;
		return bookingMapper.toDTO(booking, destinationService.findDestination(booking.getScheduledDestination().getId()),
				userService.fetchUser(booking.getRider().getId()), rideResponse);
	}

	@Override
	public List<BookingResponse> fetchBookings() {
		List<BookingResponse> responses = new ArrayList<>();
		List<Booking> bookings = bookingRepository.findAll();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public List<BookingResponse> fetchRideBookings(Long routeId, String rideType) {
		List<BookingResponse> responses = new ArrayList<>();
		List<Booking> bookings = bookingRepository.fetchBookingsForRoute(routeId, rideType);
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public List<BookingResponse> fetchUserBookings(Long userId) {
		List<Booking> bookings = bookingRepository.fetchUserUpcomingBookings(userId);
		List<BookingResponse> responses = new ArrayList<>();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public List<BookingResponse> fetchUserPastBookings(Long userId) {
		List<Booking> bookings = bookingRepository.fetchUserPastBookings(userId);
		List<BookingResponse> responses = new ArrayList<>();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public List<BookingResponse> fetchUserPastBookingsThisMonth(Long userId) {
		List<Booking> bookings = bookingRepository.fetchUserPastBookingsThisMonth(userId);
		List<BookingResponse> responses = new ArrayList<>();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public List<BookingResponse> fetchScheduledBookings() {
		List<Booking> bookings = bookingRepository.fetchScheduledBookings();
		List<BookingResponse> responses = new ArrayList<>();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}

	@Override
	public BookingResponse updateBooking(BookingRequest request, Long id) {
		Booking existingBooking = bookingRepository.findBookingById(id);
		
		// Remove associated ride 
		if(existingBooking.getRide() != null)
			rideService.removeBooking(existingBooking, existingBooking.getRide().getId());
		
		existingBooking.setDate(request.getDate());
		existingBooking.setRideType(request.getRideType());
		existingBooking.setScheduledDestination(destinationService.getDestination(request.getDestinationId()));
		
		Booking updatedBooking = bookingRepository.save(existingBooking);
		return fetchBooking(updatedBooking.getId());
	}

	@Override
	public void deleteBooking(Long id) {
		// Remove association with ride if it exists
		Booking booking = bookingRepository.findBookingById(id);
		if(booking.getRide() != null) 
			rideService.removeBooking(booking, booking.getRide().getId());	
		bookingRepository.deleteById(id);
	}

	@Override
	public List<BookingResponse> fetchBookingsByRide(Long rideId){
		List<Booking> bookings = bookingRepository.fetchBookingsByRide(rideId);
		List<BookingResponse> responses = new ArrayList<>();
		for(Booking booking : bookings)
			responses.add(fetchBooking(booking.getId()));
		return responses;
	}
	
	@Override
	public boolean userBookingExists(BookingRequest request) {
		return bookingRepository.fetchUserBooking(request.getRiderId(), request.getRideType(), request.getDate(), request.getDestinationId()) != null;
	}
}
