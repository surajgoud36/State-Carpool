package com.example.state_carpool.dto;

import java.util.List;

public class RideResponse {
	private Long id;
	private String date;
	private String createdAt;
	private List<UserResponse> passengers; // can get passengers from bookings
	private UserResponse driver;
	private RouteResponse route;
	
	public RideResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RideResponse(Long id, String date, String createdAt, List<UserResponse> passengers, UserResponse driver,
			RouteResponse route) {
		super();
		this.id = id;
		this.date = date;
		this.createdAt = createdAt;
		this.passengers = passengers;
		this.driver = driver;
		this.route = route;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public List<UserResponse> getPassengers() {
		return passengers;
	}
	public void setPassengers(List<UserResponse> passengers) {
		this.passengers = passengers;
	}
	public UserResponse getDriver() {
		return driver;
	}
	public void setDriver(UserResponse driver) {
		this.driver = driver;
	}
	public RouteResponse getRoute() {
		return route;
	}
	public void setRoute(RouteResponse route) {
		this.route = route;
	}
	
	
}
