package com.example.state_carpool.dto;

public class BookingResponse {
		private Long id;
		private String rideType;
		private DestinationResponse destination;
		private UserResponse rider;
		private String date; // date of booking
		private String createdAt;
		private RideResponse ride;
		
		public BookingResponse() {
			super();
			// TODO Auto-generated constructor stub
		}
		public BookingResponse(Long id, String rideType, DestinationResponse destination, UserResponse rider, String date,
				String createdAt, RideResponse ride) {
			super();
			this.id = id;
			this.rideType = rideType;
			this.destination = destination;
			this.rider = rider;
			this.date = date;
			this.createdAt = createdAt;
			this.ride = ride;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getRideType() {
			return rideType;
		}
		public void setRideType(String rideType) {
			this.rideType = rideType;
		}
		public DestinationResponse getDestination() {
			return destination;
		}
		public void setDestination(DestinationResponse destination) {
			this.destination = destination;
		}
		public UserResponse getRider() {
			return rider;
		}
		public void setRider(UserResponse rider) {
			this.rider = rider;
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
		public RideResponse getRide() {
			return ride;
		}
		public void setRide(RideResponse ride) {
			this.ride = ride;
		}
		
		
}
