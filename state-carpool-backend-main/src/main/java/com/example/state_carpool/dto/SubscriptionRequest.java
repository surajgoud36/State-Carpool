package com.example.state_carpool.dto;

public class SubscriptionRequest {
	private boolean autoPayEnabled;
	private String endDate;
	private Long riderId;
	
	public SubscriptionRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public SubscriptionRequest(boolean autoPayEnabled, String endDate, Long riderId) {
		super();
		this.autoPayEnabled = autoPayEnabled;
		this.endDate = endDate;
		this.riderId = riderId;
	}

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

	public Long getRiderId() {
		return riderId;
	}

	public void setRiderId(Long riderId) {
		this.riderId = riderId;
	}
	
}
