package com.example.state_carpool.dto;

import java.util.List;

public class ChatResponse {
	private Long id;
	private Long riderId;
	private Long driverId;
	private Long rideId;
	private List<MessageResponse> messages;
	
	public ChatResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ChatResponse(Long id, Long riderId, Long driverId, Long rideId, List<MessageResponse> messages) {
		super();
		this.id = id;
		this.riderId = riderId;
		this.driverId = driverId;
		this.rideId = rideId;
		this.messages = messages;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public List<MessageResponse> getMessages() {
		return messages;
	}
	public void setMessages(List<MessageResponse> messages) {
		this.messages = messages;
	}
	
	
}
