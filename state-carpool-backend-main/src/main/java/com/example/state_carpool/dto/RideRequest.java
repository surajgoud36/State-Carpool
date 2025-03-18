package com.example.state_carpool.dto;

import java.util.List;

public class RideRequest {
	private String date;
	private String createdAt;
	private List<Long> bookingIds; // can get passengers from bookings
	private Long driverId;
	private Long routeId;
	
	public RideRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RideRequest(String date, String createdAt, List<Long> bookingIds, Long driverId, Long routeId) {
		super();
		this.date = date;
		this.createdAt = createdAt;
		this.bookingIds = bookingIds;
		this.driverId = driverId;
		this.routeId = routeId;
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
	public List<Long> getBookingIds() {
		return bookingIds;
	}
	public void setBookingIds(List<Long> bookingIds) {
		this.bookingIds = bookingIds;
	}
	public Long getDriverId() {
		return driverId;
	}
	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}
	public Long getRouteId() {
		return routeId;
	}
	public void setRouteId(Long routeId) {
		this.routeId = routeId;
	}
	
	
}
