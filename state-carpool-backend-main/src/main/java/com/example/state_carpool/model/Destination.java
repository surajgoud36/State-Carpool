package com.example.state_carpool.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NonNull;

@Entity
@Table(name = "G2DESTINATION")
public class Destination {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;

	@NonNull
	private String pickupTime; 

	@NonNull
	private String dropOffTime;

	@Lob
	private byte[] image;

	@ManyToOne(fetch = FetchType.LAZY)
	@NonNull
	@JoinColumn(name = "address_id")
	private Address address;

	public Destination() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Destination(String name, @NonNull String pickupTime, @NonNull String dropOffTime, byte[] image,
			@NonNull Address address) {
		super();
		this.name = name;
		this.pickupTime = pickupTime;
		this.dropOffTime = dropOffTime;
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

	public String getDropOffTime() {
		return dropOffTime;
	}

	public void setDropOffTime(String dropOffTime) {
		this.dropOffTime = dropOffTime;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Long getId() {
		return id;
	}
}
