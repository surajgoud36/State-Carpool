package com.example.state_carpool.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "G2INQUIRY")
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private int resolved; // 0 for false, 1 for true
	
	private String message;
	
	@ManyToOne
	@JoinColumn(name = "rider_id")
	private User rider;

	public Inquiry() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Inquiry(int resolved, String message, User rider) {
		super();
		this.resolved = resolved;
		this.message = message;
		this.rider = rider;
	}
	
	public void updateInquiry(Inquiry other) {
		setResolved(other.isResolved());
		setMessage(other.getMessage());
		setRider(other.getRider());
	}

	public int isResolved() {
		return resolved;
	}

	public void setResolved(int resolved) {
		this.resolved = resolved;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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
	
}
