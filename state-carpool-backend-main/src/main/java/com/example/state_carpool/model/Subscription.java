package com.example.state_carpool.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "G2SUBSCRIPTION")
public class Subscription {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private boolean autoPayEnabled;
	private String endDate;
	
	@OneToOne(/*mappedBy = "subscription", */fetch = FetchType.LAZY)
	@JsonIgnoreProperties("subscription")
	private User rider;
	
	
	public boolean isAutoPayEnabled() {
		return autoPayEnabled;
	}

	public void setAutoPayEnabled(boolean autoPayEnabled) {
		this.autoPayEnabled = autoPayEnabled;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
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

	public Subscription(boolean autoPayEnabled, String endDate, User rider) {
		super();
		this.autoPayEnabled = autoPayEnabled;
		this.endDate = endDate;
		this.rider = rider;
	}

	public Subscription() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Subscription [id=" + id + ", autoPayEnabled=" + autoPayEnabled + ", endDate=" + endDate + ", rider="
				+ rider + "]";
	}
}
