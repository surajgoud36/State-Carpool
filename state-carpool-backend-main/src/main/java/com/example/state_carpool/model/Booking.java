package com.example.state_carpool.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NonNull;

@Entity
@Table(name = "G2BOOKING")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NonNull
	private String rideType;
		
	@NonNull
	@ManyToOne
	@JoinColumn(name = "destination_id")
	private Destination scheduledDestination;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "rider_id")
	private User rider;
	
	@NonNull
	private String date;
	
	private String createdAt;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ride_id", nullable=true)
	@JsonIgnoreProperties("bookings")
	private Ride ride;
	
	public Booking(@NonNull String rideType, @NonNull Destination scheduledDestination, @NonNull User rider,
			@NonNull String date, String createdAt, Ride ride) {
		super();
		this.rideType = rideType;
		this.scheduledDestination = scheduledDestination;
		this.rider = rider;
		this.date = date;
		this.createdAt = createdAt;
		this.ride = ride;
	}

	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getRideType() {
		return rideType;
	}

	public void setRideType(String rideType) {
		this.rideType = rideType;
	}

	public Destination getScheduledDestination() {
		return scheduledDestination;
	}

	public void setScheduledDestination(Destination scheduledDestination) {
		this.scheduledDestination = scheduledDestination;
	}

	public User getRider() {
		return rider;
	}

	public void setRider(User rider) {
		this.rider = rider;
	}

	public Long getId() {
		return id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Ride getRide() {
		return ride;
	}

	public void setRide(Ride ride) {
		this.ride = ride;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", rideType=" + rideType + ", scheduledDestination=" + scheduledDestination
				+ ", rider=" + rider + ", date=" + date + ", createdAt=" + createdAt + "]";
	}
	
}
