package com.example.state_carpool.dto;

public class BookingRequest {
	private String rideType;
	private Long destinationId;
	private Long riderId;
	private String date; // date of booking
	private String createdAt;
	private Long rideId;
	
	public BookingRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BookingRequest(String rideType, Long destinationId, Long riderId, String date, String createdAt,
			Long rideId) {
		super();
		this.rideType = rideType;
		this.destinationId = destinationId;
		this.riderId = riderId;
		this.date = date;
		this.createdAt = createdAt;
		this.rideId = rideId;
	}

	public String getRideType() {
		return rideType;
	}

	public void setRideType(String rideType) {
		this.rideType = rideType;
	}

	public Long getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(Long destinationId) {
		this.destinationId = destinationId;
	}

	public Long getRiderId() {
		return riderId;
	}

	public void setRiderId(Long riderId) {
		this.riderId = riderId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public Long getRideId() {
		return rideId;
	}

	public void setRideId(Long rideId) {
		this.rideId = rideId;
	}
	
	
}
