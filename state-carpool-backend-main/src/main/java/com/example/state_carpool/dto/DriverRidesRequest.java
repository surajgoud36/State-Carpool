package com.example.state_carpool.dto;

public class DriverRidesRequest {
	private Long driverId;
	
	public DriverRidesRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DriverRidesRequest(Long driverId) {
		super();
		this.driverId = driverId;
	}

	public Long getDriverId() {
		return driverId;
	}

	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}
}
