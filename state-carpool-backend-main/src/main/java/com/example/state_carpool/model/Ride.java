package com.example.state_carpool.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.NonNull;

@Entity
@Table(name = "G2RIDE")
public class Ride {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NonNull
	private String date;
	
	private String createdAt;
	
	@OneToMany(mappedBy = "ride", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonIgnoreProperties("ride")
	private List<Booking> bookings; // can get passengers from bookings
	
	@ManyToOne
	@JoinColumn(name = "driver_id")
	private User driver;
	
	@ManyToOne
	private Route route;

	public Ride() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Ride(@NonNull String date, String createdAt, List<Booking> bookings, User driver, Route route) {
		super();
		this.date = date;
		this.createdAt = createdAt;
		this.bookings = bookings;
		this.driver = driver;
		this.route = route;
	}
	
	public void clearBookings() {
		bookings.clear();
	}
	
	public void addBooking(Booking booking) {
		bookings.add(booking);
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	public User getDriver() {
		return driver;
	}

	public void setDriver(User driver) {
		this.driver = driver;
	}

	public Route getRoute() {
		return route;
	}

	public void setRoute(Route route) {
		this.route = route;
	}

	public Long getId() {
		return id;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

}
