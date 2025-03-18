package com.example.state_carpool.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "G2CHAT")
public class Chat {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	private Long riderId;
	private Long driverId;
	private Long rideId;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonIgnoreProperties("chat")
	private List<Message> messages;

	public Chat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Chat(Long riderId, Long driverId, Long rideId, List<Message> messages) {
		super();
		this.riderId = riderId;
		this.driverId = driverId;
		this.rideId = rideId;
		this.messages = messages;
	}
	
	public void clearMessages() {
		messages.clear();
	}
	
	public void addMessage(Message message) {
		messages.add(message);
		message.setChat(this);
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

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public Long getId() {
		return id;
	}
}
