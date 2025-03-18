package com.example.state_carpool.dto;

import jakarta.persistence.Lob;

public class DestinationRequest {
	private String name;
	private String pickupTime;
	private String dropoffTime;
	@Lob
	private byte[] image;
	private AddressRequest address;
	
	public DestinationRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DestinationRequest(String name, String pickupTime, String dropoffTime, byte[] image,
			AddressRequest address) {
		super();
		this.name = name;
		this.pickupTime = pickupTime;
		this.dropoffTime = dropoffTime;
		this.image = image;
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPickupTime() {
		return pickupTime;
	}

	public void setPickupTime(String pickupTime) {
		this.pickupTime = pickupTime;
	}

	public String getDropoffTime() {
		return dropoffTime;
	}

	public void setDropoffTime(String dropoffTime) {
		this.dropoffTime = dropoffTime;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public AddressRequest getAddress() {
		return address;
	}

	public void setAddress(AddressRequest address) {
		this.address = address;
	}

}
