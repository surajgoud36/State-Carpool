package com.example.state_carpool.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.state_carpool.dto.DriverRidesRequest;
import com.example.state_carpool.dto.RideRequest;
import com.example.state_carpool.dto.RideResponse;
import com.example.state_carpool.dto.UserResponse;
import com.example.state_carpool.mapper.RideMapper;
import com.example.state_carpool.model.Booking;
import com.example.state_carpool.model.Ride;
import com.example.state_carpool.repository.BookingRepository;
import com.example.state_carpool.repository.RideRepository;

@Service
public class RideServiceImpl implements RideService {
	
	private final RideRepository rideRepository;
	private final RideMapper rideMapper;
	private final BookingRepository bookingRepository;
	private final UserService userService;
	private final RouteService routeService;
	
	@Autowired
	public RideServiceImpl(RideRepository rideRepository, RideMapper rideMapper, BookingRepository bookingRepository,
			UserService userService, RouteService routeService) {
		super();
		this.rideRepository = rideRepository;
		this.rideMapper = rideMapper;
		this.bookingRepository = bookingRepository;
		this.userService = userService;
		this.routeService = routeService;
	}
	
	public List<Booking> getBookingsForRide(List<Long> bookingIds) {
		List<Booking> bookings = new ArrayList<>();
		for(Long bookingId : bookingIds)
			bookings.add(bookingRepository.findBookingById(bookingId));
		return bookings;
	}

	@Override
	public RideResponse createRide(RideRequest request) {
		List<Booking> bookings = getBookingsForRide(request.getBookingIds());
		Ride newRide = rideMapper.toEntity(request, bookings, userService.getUser(request.getDriverId()), routeService.getRoute(request.getRouteId()));
		Ride savedRide = rideRepository.save(newRide);
		
		for(Booking booking : savedRide.getBookings()) {
			booking.setRide(savedRide);
			bookingRepository.save(booking);
		}
		
		return fetchRide(savedRide.getId());
	}
	
	@Override
	public RideResponse fetchRide(Long id) {
		Ride ride = rideRepository.findRideById(id);
		List<UserResponse> passengers = new ArrayList<>();
		for(Booking booking : ride.getBookings()) {
			passengers.add(userService.fetchUser(booking.getRider().getId()));
		}
		
		return rideMapper.toDTO(ride, passengers, userService.fetchUser(ride.getDriver().getId()), routeService.fetchRoute(ride.getRoute().getId()));
	}

	@Override
	public List<RideResponse> fetchRides() {
		List<RideResponse> responses = new ArrayList<>();
		List<Ride> rides = rideRepository.findAll();
		for(Ride ride : rides)
			responses.add(fetchRide(ride.getId()));
		return responses;
	}
	
	@Override
	public List<RideResponse> fetchDriverRides(DriverRidesRequest request) {
		List<RideResponse> responses = new ArrayList<>();
		List<Ride> rides = rideRepository.fetchDriverRides(request.getDriverId());
		for(Ride ride : rides)
			responses.add(fetchRide(ride.getId()));
		return responses;
	}

	@Override
	public RideResponse updateRide(RideRequest request, Long id) {
		Ride existingRide = rideRepository.findRideById(id);
		existingRide.setDate(request.getDate());
		existingRide.setDriver(userService.getUser(request.getDriverId()));
		existingRide.setRoute(routeService.getRoute(request.getRouteId()));

		List<Booking> bookingsToRemove = new ArrayList<>();
		// 1) Remove old booking association
		for(Booking booking : existingRide.getBookings()) {
			if (!request.getBookingIds().contains(booking.getId())) {
				bookingsToRemove.add(booking);
				booking.setRide(null);
			}
			bookingRepository.save(booking);
		}

		for(Booking booking : bookingsToRemove) {
			existingRide.getBookings().remove(booking);
		}
		// 2) Set new booking association
//		List<Booking> newBookings = getBookingsForRide(request.getBookingIds());
//		existingRide.clearBookings();
//		for(Booking booking : newBookings) {
//			existingRide.addBooking(booking);
//			booking.setRide(existingRide);
//			bookingRepository.save(booking);
//		}
		Ride updatedRide = rideRepository.save(existingRide);
		
		return fetchRide(updatedRide.getId());
	}
	
	@Override
	public Ride getRide(Long id) {
		return rideRepository.findRideById(id);
	}
	
	@Override
	public void removeBooking(Booking booking, Long rideId) {
		Ride ride = rideRepository.findRideById(rideId);
		ride.getBookings().remove(booking);
		rideRepository.save(ride);
	}

	@Override
	public void deleteRide(Long id) {
		Ride ride = rideRepository.findRideById(id);
		rideRepository.delete(ride);
	}

}
