package com.example.state_carpool.dto;

public class FetchChatRequest {
	private Long riderId;
	private Long driverId;
	private Long rideId;
	
	public FetchChatRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public FetchChatRequest(Long riderId, Long driverId, Long rideId) {
		super();
		this.riderId = riderId;
		this.driverId = driverId;
		this.rideId = rideId;
	}
	public Long getRiderId() {
		return riderId;
	}
	public void setRiderId(Long riderId) {
		this.riderId = riderId;
	}
	public Long getDriverId() {
		return driverId;
	}
	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}
	public Long getRideId() {
		return rideId;
	}
	public void setRideId(Long rideId) {
		this.rideId = rideId;
	}
	
}
