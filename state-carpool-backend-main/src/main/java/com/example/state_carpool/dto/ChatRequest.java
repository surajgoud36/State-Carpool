package com.example.state_carpool.dto;

import java.util.List;

public class ChatRequest {
	private Long riderId;
	private Long driverId;
	private Long rideId;
	private List<MessageRequest> messages;
	
	public ChatRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChatRequest(Long riderId, Long driverId, Long rideId, List<MessageRequest> messages) {
		super();
		this.riderId = riderId;
		this.driverId = driverId;
		this.rideId = rideId;
		this.messages = messages;
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
	public List<MessageRequest> getMessages() {
		return messages;
	}
	public void setMessages(List<MessageRequest> messages) {
		this.messages = messages;
	}
	
	
}
