package com.example.state_carpool.dto;

public class SubscriptionResponse {
	private Long id;
	private boolean autoPayEnabled;
	private String endDate;
	private Long riderId;
	
	public SubscriptionResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SubscriptionResponse(Long id, boolean autoPayEnabled, String endDate, Long riderId) {
		super();
		this.id = id;
		this.autoPayEnabled = autoPayEnabled;
		this.endDate = endDate;
		this.riderId = riderId;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
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
