package com.example.state_carpool.dto;

public class AvailableDriverRequest {
	private String routeType;
	private String date;
	
	public AvailableDriverRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public AvailableDriverRequest(String routeType, String date) {
		super();
		this.routeType = routeType;
		this.date = date;
	}
	
	public String getRouteType() {
		return routeType;
	}
	
	public void setRouteType(String routeType) {
		this.routeType = routeType;
	}
	
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
}
