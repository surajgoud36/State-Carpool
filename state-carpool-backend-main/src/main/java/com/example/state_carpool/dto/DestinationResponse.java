package com.example.state_carpool.dto;

import jakarta.persistence.Lob;

public class DestinationResponse {
	private Long id;
	private String name;
	private String pickupTime;
	private String dropoffTime;
	@Lob
	private byte[] image;
	private AddressResponse address;
	
	public DestinationResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DestinationResponse(Long id, String name, String pickupTime, String dropoffTime, byte[] image,
			AddressResponse address) {
		super();
		this.id = id;
		this.name = name;
		this.pickupTime = pickupTime;
		this.dropoffTime = dropoffTime;
		this.image = image;
		this.address = address;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public AddressResponse getAddress() {
		return address;
	}

	public void setAddress(AddressResponse address) {
		this.address = address;
	}
}
